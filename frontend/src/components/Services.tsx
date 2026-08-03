import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { useI18n } from '../i18n/I18nContext';
import type { ServiceCopy } from '../i18n/translations';
import './Services.css';

export default function Services() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<ServiceCopy | null>(null);
  const services = t.services.items;

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

  const renderIcon = (iconName: string) => {
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
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2>
              {t.services.title} <span>{t.services.titleAccent}</span>
            </h2>
            <p>{t.services.subtitle}</p>
          </div>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.id} delayClass={`delay-${Math.min(index + 1, 4)}`}>
              <button
                type="button"
                className="service-card"
                onClick={() => setActive(service)}
                aria-haspopup="dialog"
              >
                <div className="service-icon-box">
                  <span className="icon">{renderIcon(service.icon)}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="learn-more">{t.services.learnMore}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="service-modal-overlay"
          role="presentation"
          onClick={() => setActive(null)}
        >
          <div
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="service-modal-close"
              onClick={() => setActive(null)}
              aria-label={t.services.close}
            >
              ×
            </button>
            <div className="service-modal-icon" aria-hidden="true">
              {renderIcon(active.icon)}
            </div>
            <h3 id="service-modal-title">{active.title}</h3>
            <div className="service-modal-body">
              {active.details.map((section) => (
                <section key={section.heading} className="service-modal-section">
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
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setActive(null)}
            >
              {t.services.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
