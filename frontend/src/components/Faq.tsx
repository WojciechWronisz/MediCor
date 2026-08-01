import Reveal from './Reveal';
import { useI18n } from '../i18n/I18nContext';
import './Faq.css';

export default function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" className="faq">
      <div className="container">
        <Reveal className="section-header">
          <h2>
            {t.faq.title} <span>{t.faq.titleAccent}</span>
          </h2>
          <p>{t.faq.subtitle}</p>
          <div className="coming-soon-badge">{t.faq.badge}</div>
        </Reveal>

        <div className="faq-list">
          {t.faq.items.map((item, index) => (
            <Reveal
              key={item.q}
              className="faq-item"
              delayClass={`delay-${Math.min(index + 1, 4)}`}
            >
              <div className="faq-q">
                <span className="faq-mark">?</span>
                <h3>{item.q}</h3>
              </div>
              <p>{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
