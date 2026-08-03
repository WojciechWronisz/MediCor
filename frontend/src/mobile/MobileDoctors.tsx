import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import './MobileDoctors.css';

export default function MobileDoctors() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const doctor = t.doctor;

  useEffect(() => {
    setOpen(false);
  }, [lang]);

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
    <section className="m-section m-section-alt" id="doctors">
      <div className="m-header">
        <h2>
          {doctor.title} <span>{doctor.titleAccent}</span>
        </h2>
        <p>{doctor.subtitle}</p>
      </div>

      <button
        type="button"
        className="m-doctor-card"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <div className="m-doctor-avatar" aria-hidden="true">
          <svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="36" r="24" />
            <path d="M20 128c0-28 18-44 40-44s40 16 40 44v8H20v-8z" />
          </svg>
        </div>
        <div className="m-doctor-info">
          <h3>{doctor.name}</h3>
          <span className="m-doctor-spec">{doctor.specialty}</span>
          <p>{doctor.bio}</p>
          <em>{doctor.learnMore}</em>
        </div>
      </button>

      {open && (
        <div className="m-modal-overlay" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="m-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="m-doctor-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="m-modal-close"
              onClick={() => setOpen(false)}
              aria-label={doctor.close}
            >
              ×
            </button>
            <h3 id="m-doctor-title">{doctor.name}</h3>
            <p className="m-doctor-spec">{doctor.specialty}</p>
            <p className="m-doctor-bio">{doctor.bio}</p>
            {doctor.details.map((section) => (
              <section key={section.heading} className="m-modal-section">
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
            <div className="m-doctor-actions">
              <a href="#contact" className="m-btn m-btn-primary" onClick={() => setOpen(false)}>
                {doctor.goContact}
              </a>
              <button type="button" className="m-btn m-btn-secondary" onClick={() => setOpen(false)}>
                {doctor.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
