import { useI18n } from '../i18n/I18nContext';
import './PhoneCta.css';

export default function PhoneCta() {
  const { t } = useI18n();

  return (
    <a
      href="tel:+48897522703"
      className="phone-cta"
      aria-label={`${t.cta.label}: ${t.cta.phoneDisplay}`}
    >
      <span className="phone-cta-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="phone-cta-copy">
        <span className="phone-cta-label">{t.cta.label}</span>
        <span className="phone-cta-number">{t.cta.phoneDisplay}</span>
      </span>
    </a>
  );
}
