-- Schemat bazy MediCor — system rezerwacji wizyt

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
  CREATE TYPE appointment_type AS ENUM ('NFZ', 'PRYWATNA');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE appointment_status AS ENUM ('Zaplanowana', 'Zrealizowana', 'Odwołana');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  experience_years INT NOT NULL CHECK (experience_years >= 0)
);

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  pesel VARCHAR(11) UNIQUE,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES doctors(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  appointment_date TIMESTAMP NOT NULL,
  type appointment_type NOT NULL,
  referral_number VARCHAR(100),
  status appointment_status NOT NULL DEFAULT 'Zaplanowana',
  CONSTRAINT unique_doctor_slot UNIQUE (doctor_id, appointment_date)
);

CREATE INDEX IF NOT EXISTS idx_appointments_doctor_date
  ON appointments (doctor_id, appointment_date);

CREATE INDEX IF NOT EXISTS idx_patients_pesel ON patients (pesel);

-- Dane startowe: Twój Kardiolog
INSERT INTO doctors (first_name, last_name, specialization, degree, experience_years)
SELECT 'Krzysztof', 'Wronisz', 'Internista 2. stopnia / Spec. Kardiologia', 'lek. spec.', 30
WHERE NOT EXISTS (
  SELECT 1 FROM doctors WHERE last_name = 'Wronisz' AND first_name = 'Krzysztof'
);
