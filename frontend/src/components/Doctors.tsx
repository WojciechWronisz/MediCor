import React, { useEffect, useState } from 'react';
import { API_ENABLED, fetchJson } from '../api';
import Reveal from './Reveal';
import './Doctors.css';

interface DoctorSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experienceYears?: number;
  /** Pełny opis w popupie — uzupełnić, gdy będą gotowe treści */
  details: DoctorSection[];
}

const LEKARZ_DOMOWY: Doctor = {
  id: '1',
  name: 'lek. spec. Krzysztof Wronisz',
  specialty: 'Internista 2. stopnia / Spec. Kardiologia',
  bio: '30 lat doświadczenia w zawodzie',
  experienceYears: 30,
  details: [
    {
      heading: 'O lekarzu',
      paragraphs: [
        // TODO: wkleić finalny biogram
        'Szczegółowy opis profilu lekarza pojawi się wkrótce.',
      ],
    },
    {
      heading: 'Wykształcenie i specjalizacje',
      list: [
        // TODO: uzupełnić listę
        'Internista 2. stopnia',
        'Specjalizacja: kardiologia',
        'Pozostałe pozycje — w przygotowaniu',
      ],
    },
    {
      heading: 'Doświadczenie zawodowe',
      paragraphs: [
        // TODO: uzupełnić historię / miejsca pracy
        'Ponad 30 lat doświadczenia w zawodzie. Pełniejszy opis doświadczenia zostanie dodany w kolejnej aktualizacji treści.',
      ],
    },
    {
      heading: 'Zakres opieki',
      list: [
        // TODO: doprecyzować zakres
        'Konsultacje kardiologiczne',
        'Diagnostyka chorób układu krążenia',
        'Indywidualny plan dalszego postępowania',
      ],
    },
  ],
};

const Doctors: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor>(LEKARZ_DOMOWY);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!API_ENABLED) return;

    let cancelled = false;
    fetchJson<Omit<Doctor, 'details'>[]>('/doctors').then((data) => {
      if (!cancelled && Array.isArray(data) && data.length > 0) {
        const fromApi = data[0];
        setDoctor((prev) => ({
          ...prev,
          ...fromApi,
          details: prev.details,
        }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <section className="doctors" id="doctors">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2>
              Twój <span>Kardiolog</span>
            </h2>
            <p>
              Profesjonalna opieka kardiologiczna oparta na wieloletnim doświadczeniu klinicznym.
              Kliknij kartę, aby zobaczyć więcej informacji.
            </p>
          </div>
        </Reveal>

        <Reveal delayClass="delay-2">
          <button
            type="button"
            className="doctor-feature"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
          >
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
              <span className="doctor-more">Dowiedz się więcej →</span>
            </div>
          </button>
        </Reveal>
      </div>

      {open && (
        <div
          className="doctor-modal-overlay"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="doctor-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="doctor-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="doctor-modal-close"
              onClick={() => setOpen(false)}
              aria-label="Zamknij"
            >
              ×
            </button>

            <div className="doctor-modal-header">
              <div className="doctor-modal-avatar" aria-hidden="true">
                <svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="36" r="24" />
                  <path d="M20 128c0-28 18-44 40-44s40 16 40 44v8H20v-8z" />
                </svg>
              </div>
              <div>
                <h3 id="doctor-modal-title">{doctor.name}</h3>
                <span className="specialty">{doctor.specialty}</span>
                <p className="experience">{doctor.bio}</p>
              </div>
            </div>

            <div className="doctor-modal-body">
              {doctor.details.map((section) => (
                <section key={section.heading} className="doctor-modal-section">
                  <h4>{section.heading}</h4>
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="doctor-modal-actions">
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={() => setOpen(false)}
              >
                Przejdź do kontaktu
              </a>
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Doctors;
