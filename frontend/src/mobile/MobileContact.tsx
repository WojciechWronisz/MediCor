import { useI18n } from '../i18n/I18nContext';
import './MobileContact.css';

export default function MobileContact() {
  const { t } = useI18n();

  return (
    <section className="m-section m-section-surface" id="contact">
      <div className="m-header">
        <h2>
          {t.contact.title} <span>{t.contact.titleAccent}</span>
        </h2>
        <p>{t.contact.subtitle}</p>
      </div>

      <div className="m-contact-panel">
        <div className="m-contact-block">
          <h3>{t.contact.addressTitle}</h3>
          <p>
            ul. Traugutta 7
            <br />
            11-400 Kętrzyn
          </p>
        </div>

        <div className="m-contact-block">
          <h3>{t.contact.hoursTitle}</h3>
          <ul className="m-hours">
            <li>
              <span>{t.contact.mon}</span>
              <strong>13:00 – 18:00</strong>
            </li>
            <li>
              <span>{t.contact.tueThu}</span>
              <strong>8:00 – 13:00</strong>
            </li>
            <li>
              <span>{t.contact.friSun}</span>
              <strong>{t.contact.closed}</strong>
            </li>
          </ul>
        </div>

        <div className="m-contact-block">
          <h3>{t.contact.contactTitle}</h3>
          <p>
            {t.contact.phone}: <a href="tel:+48897522703">89 752 27 03</a>
            <br />
            {t.contact.email}: {t.contact.emailSoon}
          </p>
        </div>
      </div>

      <div className="m-map">
        <iframe
          title="Mapa – ul. Traugutta 7, 11-400 Kętrzyn"
          src="https://maps.google.com/maps?q=ul.+Traugutta+7,+11-400+K%C4%99trzyn&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
