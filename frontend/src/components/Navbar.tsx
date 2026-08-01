import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';
import type { Lang } from '../i18n/translations';
import './Navbar.css';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'pl', label: 'PL' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const logoSrc = theme === 'dark' ? '/medicor-logo-dark.png' : '/medicor-logo.png';

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <a href="#home" className="logo" aria-label="MediCor">
          <img
            src={logoSrc}
            alt="MediCor — lek. Krzysztof Wronisz"
            className="logo-img"
          />
        </a>

        <ul className="nav-links">
          <li>
            <a href="#home">{t.nav.home}</a>
          </li>
          <li>
            <a href="#services">{t.nav.services}</a>
          </li>
          <li>
            <a href="#doctors">{t.nav.doctor}</a>
          </li>
          <li>
            <a href="#first-visit">{t.nav.firstVisit}</a>
          </li>
          <li>
            <a href="#faq">{t.nav.faq}</a>
          </li>
          <li>
            <a href="#contact">{t.nav.contact}</a>
          </li>
        </ul>

        <div className="nav-controls">
          <div className="lang-switch" role="group" aria-label={t.lang.label}>
            {LANGS.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`lang-btn ${lang === item.code ? 'is-active' : ''}`}
                onClick={() => setLang(item.code)}
                aria-pressed={lang === item.code}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t.theme.dark : t.theme.light}
            title={theme === 'light' ? t.theme.dark : t.theme.light}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 14.3A9 9 0 1 1 9.7 3 7 7 0 0 0 21 14.3z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
