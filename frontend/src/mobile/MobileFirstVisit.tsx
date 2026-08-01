import { useI18n } from '../i18n/I18nContext';
import './MobileFirstVisit.css';

export default function MobileFirstVisit() {
  const { t } = useI18n();

  return (
    <section className="m-section m-section-surface" id="first-visit">
      <div className="m-header">
        <h2>
          {t.firstVisit.title} <span>{t.firstVisit.titleAccent}</span>
        </h2>
        <p>{t.firstVisit.subtitle}</p>
        <div className="m-badge">{t.firstVisit.badge}</div>
      </div>

      <ol className="m-steps">
        {t.firstVisit.steps.map((step, index) => (
          <li key={step.title} className="m-step">
            <span className="m-step-num">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{step.title.replace(/^\d+\.\s*/, '')}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
