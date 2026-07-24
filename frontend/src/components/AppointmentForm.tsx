import React, { useState, useEffect } from 'react';
import { API_BASE, API_ENABLED, fetchJson } from '../api';
import './AppointmentForm.css';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

type VisitType = 'prywatna' | 'nfz';

interface FormData {
  visitType: VisitType;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  pesel: string;
  referralNumber: string;
  specialty: string;
  doctorId: string;
  date: string;
  time: string;
}

interface BookingSummary {
  id?: string;
  visitType: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  pesel?: string;
  referralNumber?: string;
}

const DOKTORZY_AWARYJNI: Doctor[] = [
  {
    id: '1',
    name: 'lek. spec. Krzysztof Wronisz',
    specialty: 'Internista 2. stopnia / Spec. Kardiologia',
  },
];

const GODZINY_DOMYSLNE = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];

const POCZATKOWE_DANE: FormData = {
  visitType: 'prywatna',
  patientName: '',
  patientEmail: '',
  patientPhone: '',
  pesel: '',
  referralNumber: '',
  specialty: '',
  doctorId: '',
  date: '',
  time: '',
};

function rozdzielImieNazwisko(pelne: string): { firstName: string; lastName: string } {
  const czesci = pelne.trim().split(/\s+/);
  if (czesci.length === 1) return { firstName: czesci[0], lastName: czesci[0] };
  return {
    firstName: czesci[0],
    lastName: czesci.slice(1).join(' '),
  };
}

const AppointmentForm: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(DOKTORZY_AWARYJNI);
  const [formData, setFormData] = useState<FormData>(POCZATKOWE_DANE);
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  const [blad, setBlad] = useState('');
  const [wysylanie, setWysylanie] = useState(false);
  const [wolneGodziny, setWolneGodziny] = useState<string[]>(GODZINY_DOMYSLNE);

  useEffect(() => {
    if (!API_ENABLED) return;

    let cancelled = false;
    fetchJson<Doctor[]>('/doctors').then((data) => {
      if (!cancelled && Array.isArray(data) && data.length > 0) setDoctors(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!formData.doctorId || !formData.date) {
      setWolneGodziny(GODZINY_DOMYSLNE);
      return;
    }
    if (!API_ENABLED) {
      setWolneGodziny(GODZINY_DOMYSLNE);
      return;
    }

    let cancelled = false;
    fetchJson<{ slots?: string[] }>(
      `/doctors/${formData.doctorId}/availability?date=${formData.date}`
    ).then((data) => {
      if (cancelled || !data) {
        if (!cancelled) setWolneGodziny(GODZINY_DOMYSLNE);
        return;
      }
      if (Array.isArray(data.slots)) {
        setWolneGodziny(data.slots);
        if (formData.time && !data.slots.includes(formData.time)) {
          setFormData((prev) => ({ ...prev, time: '' }));
        }
      }
    });
    return () => {
      cancelled = true;
    };
  }, [formData.doctorId, formData.date]);

  const specjalizacje = [...new Set(doctors.map((d) => d.specialty))];
  const dostepniLekarze = formData.specialty
    ? doctors.filter((d) => d.specialty === formData.specialty)
    : doctors;

  const jutro = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const walidujPesel = (pesel: string) => /^\d{11}$/.test(pesel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlad('');

    if (formData.visitType === 'nfz' && !walidujPesel(formData.pesel)) {
      setBlad('Podaj prawidłowy numer PESEL (11 cyfr).');
      return;
    }

    const lekarz = doctors.find((d) => d.id === formData.doctorId);
    if (!lekarz || !formData.date || !formData.time) {
      setBlad('Uzupełnij wszystkie wymagane pola.');
      return;
    }

    const { firstName, lastName } = rozdzielImieNazwisko(formData.patientName);
    const type = formData.visitType === 'nfz' ? 'NFZ' : 'PRYWATNA';
    const appointmentDate = `${formData.date}T${formData.time}:00`;

    setWysylanie(true);
    try {
      if (!API_ENABLED) {
        setBlad('Rezerwacja online jest chwilowo niedostępna.');
        return;
      }

      const response = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: formData.doctorId,
          appointmentDate,
          type,
          referralNumber: formData.referralNumber || undefined,
          firstName,
          lastName,
          pesel: formData.visitType === 'nfz' ? formData.pesel : undefined,
          phone: formData.patientPhone,
          email: formData.patientEmail,
        }),
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        setBlad('Serwer API jest niedostępny. Spróbuj później.');
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        setBlad(data.error || 'Nie udało się zarezerwować wizyty.');
        return;
      }

      setSummary({
        id: data.appointment?.id,
        visitType: type === 'NFZ' ? 'NFZ' : 'Prywatna',
        patientName: formData.patientName,
        doctorName: lekarz.name,
        specialty: lekarz.specialty,
        date: formData.date,
        time: formData.time,
        pesel: formData.visitType === 'nfz' ? formData.pesel : undefined,
        referralNumber:
          formData.visitType === 'nfz' && formData.referralNumber
            ? formData.referralNumber
            : undefined,
      });
    } catch {
      setBlad('Brak połączenia z serwerem. Spróbuj ponownie.');
    } finally {
      setWysylanie(false);
    }
  };

  const zamknijModal = () => {
    setSummary(null);
    setFormData(POCZATKOWE_DANE);
  };

  return (
    <section className="appointments" id="appointments">
      <div className="container">
        <div className="appointment-wrapper">
          <div className="appointment-info">
            <h2>
              Zarezerwuj <span>wizytę</span>
            </h2>
            <p>
              Wybierz typ wizyty, specjalistę oraz dogodny termin. Rezerwacja online
              jest szybka i wygodna — potwierdzenie otrzymasz od razu.
            </p>
            <div className="contact-details">
              <div className="detail">
                <strong>Adres:</strong> ul. Traugutta 7, 11-400 Kętrzyn
              </div>
              <div className="detail">
                <strong>Telefon:</strong> +48 89 751 00 00
              </div>
              <div className="detail">
                <strong>E-mail:</strong> rejestracja@medicor.pl
              </div>
            </div>
          </div>

          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="visit-type-toggle" role="tablist" aria-label="Typ wizyty">
              <button
                type="button"
                role="tab"
                className={formData.visitType === 'prywatna' ? 'active' : ''}
                aria-selected={formData.visitType === 'prywatna'}
                onClick={() =>
                  setFormData({ ...formData, visitType: 'prywatna', pesel: '', referralNumber: '' })
                }
              >
                Prywatna
              </button>
              <button
                type="button"
                role="tab"
                className={formData.visitType === 'nfz' ? 'active' : ''}
                aria-selected={formData.visitType === 'nfz'}
                onClick={() => setFormData({ ...formData, visitType: 'nfz' })}
              >
                NFZ
              </button>
            </div>

            {formData.visitType === 'nfz' && (
              <div className="nfz-fields">
                <p className="nfz-hint">
                  Wizyta NFZ — numer PESEL jest wymagany. Dane trafiają do systemu poradni
                  (bez zewnętrznej integracji z NFZ).
                </p>
                <div className="form-group">
                  <label htmlFor="pesel">Numer PESEL *</label>
                  <input
                    id="pesel"
                    type="text"
                    inputMode="numeric"
                    maxLength={11}
                    required
                    value={formData.pesel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pesel: e.target.value.replace(/\D/g, '').slice(0, 11),
                      })
                    }
                    placeholder="11 cyfr"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="referral">Numer skierowania (opcjonalnie)</label>
                  <input
                    id="referral"
                    type="text"
                    value={formData.referralNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, referralNumber: e.target.value })
                    }
                    placeholder="np. SKR/2026/12345"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="patientName">Imię i nazwisko *</label>
              <input
                id="patientName"
                type="text"
                required
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Jan Kowalski"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientEmail">Adres e-mail *</label>
                <input
                  id="patientEmail"
                  type="email"
                  required
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                  placeholder="jan@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="patientPhone">Telefon *</label>
                <input
                  id="patientPhone"
                  type="tel"
                  required
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                  placeholder="+48 500 000 000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="specialty">Specjalizacja *</label>
                <select
                  id="specialty"
                  required
                  value={formData.specialty}
                  onChange={(e) =>
                    setFormData({ ...formData, specialty: e.target.value, doctorId: '' })
                  }
                >
                  <option value="">Wybierz specjalizację…</option>
                  {specjalizacje.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="doctorId">Lekarz *</label>
                <select
                  id="doctorId"
                  required
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  disabled={!formData.specialty}
                >
                  <option value="">
                    {formData.specialty ? 'Wybierz lekarza…' : 'Najpierw wybierz specjalizację'}
                  </option>
                  {dostepniLekarze.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="date">Data wizyty *</label>
              <input
                id="date"
                type="date"
                required
                min={jutro()}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
              />
            </div>

            <div className="form-group">
              <label>Godzina *</label>
              <div className="time-slots" role="group" aria-label="Dostępne godziny">
                {wolneGodziny.length === 0 && formData.date ? (
                  <p className="no-slots">Brak wolnych terminów w tym dniu.</p>
                ) : (
                  wolneGodziny.map((godzina) => (
                    <button
                      key={godzina}
                      type="button"
                      className={`time-slot ${formData.time === godzina ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, time: godzina })}
                      disabled={!formData.date}
                    >
                      {godzina}
                    </button>
                  ))
                )}
              </div>
            </div>

            {blad && <div className="status-msg error">{blad}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={wysylanie}>
              {wysylanie ? 'Zapisywanie…' : 'Zarezerwuj wizytę'}
            </button>
          </form>
        </div>
      </div>

      {summary && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-card">
            <div className="modal-icon" aria-hidden="true">
              ✓
            </div>
            <h3 id="modal-title">Wizyta zarezerwowana</h3>
            <p className="modal-lead">
              Dziękujemy! Rezerwacja została zapisana w systemie poradni.
            </p>
            <ul className="modal-summary">
              {summary.id && (
                <li>
                  <span>Numer rezerwacji</span>
                  <strong className="booking-id">{summary.id.slice(0, 8)}…</strong>
                </li>
              )}
              <li>
                <span>Typ wizyty</span>
                <strong>{summary.visitType}</strong>
              </li>
              <li>
                <span>Pacjent</span>
                <strong>{summary.patientName}</strong>
              </li>
              {summary.pesel && (
                <li>
                  <span>PESEL</span>
                  <strong>{summary.pesel}</strong>
                </li>
              )}
              {summary.referralNumber && (
                <li>
                  <span>Skierowanie</span>
                  <strong>{summary.referralNumber}</strong>
                </li>
              )}
              <li>
                <span>Lekarz</span>
                <strong>{summary.doctorName}</strong>
              </li>
              <li>
                <span>Specjalizacja</span>
                <strong>{summary.specialty}</strong>
              </li>
              <li>
                <span>Termin</span>
                <strong>
                  {summary.date} · {summary.time}
                </strong>
              </li>
            </ul>
            <button type="button" className="btn btn-primary btn-block" onClick={zamknijModal}>
              Zamknij
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AppointmentForm;
