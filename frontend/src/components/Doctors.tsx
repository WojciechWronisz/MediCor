import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { useI18n } from '../i18n/I18nContext';
import './Doctors.css';

export default function Doctors() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const doctor = t.doctor;

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
              {doctor.title} <span>{doctor.titleAccent}</span>
            </h2>
            <p>{doctor.subtitle}</p>
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
              <span className="doctor-more">{doctor.learnMore}</span>
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
              aria-label={doctor.close}
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
              <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>
                {doctor.goContact}
              </a>
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                {doctor.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
