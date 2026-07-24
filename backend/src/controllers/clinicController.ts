import type { Request, Response } from 'express';
import { doctors, services } from '../models/data.js';
import { pool } from '../db.js';

/** Prosta walidacja PESEL (11 cyfr + suma kontrolna) */
function isValidPesel(pesel: string): boolean {
  if (!/^\d{11}$/.test(pesel)) return false;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const sum = weights.reduce((acc, w, i) => acc + w * Number(pesel[i]), 0);
  const control = (10 - (sum % 10)) % 10;
  return control === Number(pesel[10]);
}

function mapDoctorRow(row: {
  id: string;
  first_name: string;
  last_name: string;
  specialization: string;
  degree: string;
  experience_years: number;
}) {
  return {
    id: row.id,
    name: `${row.degree} ${row.first_name} ${row.last_name}`,
    firstName: row.first_name,
    lastName: row.last_name,
    degree: row.degree,
    specialty: row.specialization,
    bio: `${row.experience_years} lat doświadczenia w zawodzie`,
    experienceYears: row.experience_years,
  };
}

export const getDoctors = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, specialization, degree, experience_years
       FROM doctors ORDER BY last_name, first_name`
    );
    if (result.rows.length > 0) {
      return res.json(result.rows.map(mapDoctorRow));
    }
  } catch {
    /* fallback do danych w pamięci */
  }
  res.json(doctors);
};

export const getDoctorAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const date = typeof req.query.date === 'string' ? req.query.date : undefined;

  const godziny = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  if (!date) {
    return res.json({ doctorId: id, date: null, slots: godziny });
  }

  try {
    const result = await pool.query(
      `SELECT to_char(appointment_date, 'HH24:MI') AS slot
       FROM appointments
       WHERE doctor_id = $1
         AND appointment_date::date = $2::date
         AND status <> 'Odwołana'`,
      [id, date]
    );
    const zajete = new Set(result.rows.map((r: { slot: string }) => r.slot));
    const wolne = godziny.filter((g) => !zajete.has(g));
    return res.json({ doctorId: id, date, slots: wolne });
  } catch {
    return res.json({ doctorId: id, date, slots: godziny });
  }
};

export const getServices = (_req: Request, res: Response) => {
  res.json(services);
};

export const getAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT a.id, a.appointment_date, a.type, a.referral_number, a.status,
              d.first_name AS doctor_first_name, d.last_name AS doctor_last_name,
              p.first_name AS patient_first_name, p.last_name AS patient_last_name,
              p.email, p.phone, p.pesel
       FROM appointments a
       JOIN doctors d ON d.id = a.doctor_id
       JOIN patients p ON p.id = a.patient_id
       WHERE a.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono wizyty.' });
    }
    return res.json(result.rows[0]);
  } catch {
    return res.status(503).json({ error: 'Baza danych jest niedostępna.' });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  const {
    doctorId,
    appointmentDate,
    type,
    referralNumber,
    firstName,
    lastName,
    pesel,
    phone,
    email,
  } = req.body;

  if (!doctorId || !appointmentDate || !type || !firstName || !lastName || !phone || !email) {
    return res.status(400).json({ error: 'Brakuje wymaganych pól.' });
  }

  if (type !== 'NFZ' && type !== 'PRYWATNA') {
    return res.status(400).json({ error: 'Nieprawidłowy typ wizyty. Dozwolone: NFZ, PRYWATNA.' });
  }

  if (type === 'NFZ') {
    if (!pesel || !isValidPesel(String(pesel))) {
      return res.status(400).json({ error: 'Dla wizyty NFZ wymagany jest prawidłowy numer PESEL.' });
    }
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
  if (!emailOk) {
    return res.status(400).json({ error: 'Nieprawidłowy adres e-mail.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let patientId: string;
    if (type === 'NFZ' && pesel) {
      const existing = await client.query(`SELECT id FROM patients WHERE pesel = $1`, [pesel]);
      if (existing.rows.length > 0) {
        patientId = existing.rows[0].id;
        await client.query(
          `UPDATE patients SET first_name = $1, last_name = $2, phone = $3, email = $4 WHERE id = $5`,
          [firstName, lastName, phone, email, patientId]
        );
      } else {
        const inserted = await client.query(
          `INSERT INTO patients (first_name, last_name, pesel, phone, email)
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [firstName, lastName, pesel, phone, email]
        );
        patientId = inserted.rows[0].id;
      }
    } else {
      const inserted = await client.query(
        `INSERT INTO patients (first_name, last_name, pesel, phone, email)
         VALUES ($1, $2, NULL, $3, $4) RETURNING id`,
        [firstName, lastName, phone, email]
      );
      patientId = inserted.rows[0].id;
    }

    const appointment = await client.query(
      `INSERT INTO appointments (doctor_id, patient_id, appointment_date, type, referral_number, status)
       VALUES ($1, $2, $3::timestamp, $4::appointment_type, $5, 'Zaplanowana')
       RETURNING id, doctor_id, patient_id, appointment_date, type, referral_number, status`,
      [doctorId, patientId, appointmentDate, type, type === 'NFZ' ? referralNumber || null : null]
    );

    await client.query('COMMIT');
    return res.status(201).json({
      message: 'Wizyta została zarezerwowana.',
      appointment: appointment.rows[0],
    });
  } catch (err: unknown) {
    await client.query('ROLLBACK');
    const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: string }).code) : '';
    if (code === '23505') {
      return res.status(409).json({ error: 'Ten termin jest już zajęty. Wybierz inną godzinę.' });
    }
    console.error('Błąd tworzenia wizyty:', err);
    return res.status(500).json({ error: 'Nie udało się utworzyć wizyty.' });
  } finally {
    client.release();
  }
};
