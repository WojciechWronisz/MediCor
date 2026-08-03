import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import type { ServiceCopy } from '../i18n/translations';
import './MobileServices.css';

function renderIcon(iconName: string) {
  switch (iconName) {
    case 'heart-pulse':
      return '❤️';
    case 'waveform':
      return '📈';
    case 'activity':
      return '⚡';
    case 'clock':
      return '🕒';
    default:
      return '◈';
  }
}

export default function MobileServices() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<ServiceCopy | null>(null);

  useEffect(() => {
    setActive(null);
  }, [lang]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section className="m-section m-section-surface" id="services">
      <div className="m-header">
        <h2>
          {t.services.title} <span>{t.services.titleAccent}</span>
        </h2>
        <p>{t.services.subtitle}</p>
      </div>

      <div className="m-services-list">
        {t.services.items.map((service) => (
          <button
            key={service.id}
            type="button"
            className="m-service-row"
            onClick={() => setActive(service)}
            aria-haspopup="dialog"
          >
            <span className="m-service-icon" aria-hidden="true">
              {renderIcon(service.icon)}
            </span>
            <span className="m-service-copy">
              <strong>{service.title}</strong>
              <span>{service.description}</span>
              <em>{t.services.learnMore}</em>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="m-modal-overlay" role="presentation" onClick={() => setActive(null)}>
          <div
            className="m-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="m-service-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="m-modal-close"
              onClick={() => setActive(null)}
              aria-label={t.services.close}
            >
              ×
            </button>
            <p className="m-modal-emoji" aria-hidden="true">
              {renderIcon(active.icon)}
            </p>
            <h3 id="m-service-title">{active.title}</h3>
            {active.details.map((section) => (
              <section key={section.heading} className="m-modal-section">
                <h4>{section.heading}</h4>
                {section.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <button type="button" className="m-btn m-btn-primary" onClick={() => setActive(null)}>
              {t.services.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
