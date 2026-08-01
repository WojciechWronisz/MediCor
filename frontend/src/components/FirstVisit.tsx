import Reveal from './Reveal';
import { useI18n } from '../i18n/I18nContext';
import './FirstVisit.css';

export default function FirstVisit() {
  const { t } = useI18n();

  return (
    <section id="first-visit" className="first-visit">
      <div className="container">
        <Reveal className="section-header">
          <h2>
            {t.firstVisit.title} <span>{t.firstVisit.titleAccent}</span>
          </h2>
          <p>{t.firstVisit.subtitle}</p>
          <div className="coming-soon-badge">{t.firstVisit.badge}</div>
        </Reveal>

        <div className="first-visit-grid">
          {t.firstVisit.steps.map((step, index) => (
            <Reveal
              key={step.title}
              className="first-visit-card"
              delayClass={`delay-${Math.min(index + 1, 4)}`}
            >
              <span className="first-visit-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title.replace(/^\d+\.\s*/, '')}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
