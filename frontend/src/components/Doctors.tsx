import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';
import './Doctors.css';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experienceYears?: number;
}

const LEKARZ_DOMOWY: Doctor = {
  id: '1',
  name: 'lek. spec. Krzysztof Wronisz',
  specialty: 'Internista 2. stopnia / Spec. Kardiologia',
  bio: '30 lat doświadczenia w zawodzie',
  experienceYears: 30,
};

const Doctors: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>(LEKARZ_DOMOWY);

  useEffect(() => {
    fetch(`${API_BASE}/doctors`)
      .then((res) => res.json())
      .then((data: Doctor[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setDoctor(data[0]);
        }
      })
      .catch(() => {
        /* używamy danych domyślnych */
      });
  }, []);

  return (
    <section className="doctors" id="doctors">
      <div className="container">
        <div className="section-header">
          <h2>
            Twój <span>Kardiolog</span>
          </h2>
          <p>Profesjonalna opieka kardiologiczna oparta na wieloletnim doświadczeniu klinicznym.</p>
        </div>

        <div className="doctor-feature">
          <div className="doctor-image-placeholder" aria-hidden="true">
            <svg
              className="doctor-silhouette"
              viewBox="0 0 120 140"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <circle cx="60" cy="36" r="24" />
              <path d="M20 128c0-28 18-44 40-44s40 16 40 44v8H20v-8z" />
            </svg>
          </div>
          <div className="doctor-info">
            <h3>{doctor.name}</h3>
            <span className="specialty">{doctor.specialty}</span>
            <p className="experience">{doctor.bio}</p>
            <a href="#contact" className="btn btn-primary">
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
