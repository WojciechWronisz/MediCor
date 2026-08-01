import { useI18n } from '../i18n/I18nContext';
import './MobileFaq.css';

export default function MobileFaq() {
  const { t } = useI18n();

  return (
    <section className="m-section m-section-alt" id="faq">
      <div className="m-header">
        <h2>
          {t.faq.title} <span>{t.faq.titleAccent}</span>
        </h2>
        <p>{t.faq.subtitle}</p>
        <div className="m-badge">{t.faq.badge}</div>
      </div>

      <div className="m-faq-list">
        {t.faq.items.map((item) => (
          <article key={item.q} className="m-faq-item">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
