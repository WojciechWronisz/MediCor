import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';
import type { Lang } from '../i18n/translations';
import './MobileNavbar.css';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'pl', label: 'PL' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

export default function MobileNavbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const logoSrc = theme === 'dark' ? '/medicor-logo-dark.png' : '/medicor-logo.png';

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#doctors', label: t.nav.doctor },
    { href: '#first-visit', label: t.nav.firstVisit },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

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

  const close = () => setOpen(false);

  return (
    <header className="m-nav">
      <div className="m-nav-bar">
        <a href="#home" className="m-nav-logo" aria-label="MediCor" onClick={close}>
          <img src={logoSrc} alt="MediCor" />
        </a>

        <div className="m-nav-actions">
          <button
            type="button"
            className="m-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t.theme.dark : t.theme.light}
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

          <button
            type="button"
            className={`m-burger ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="m-drawer"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="m-drawer-backdrop" role="presentation" onClick={close}>
          <nav
            id="m-drawer"
            className="m-drawer"
            aria-label="Menu"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="m-drawer-links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={close}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="m-drawer-lang" role="group" aria-label={t.lang.label}>
              {LANGS.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={lang === item.code ? 'is-active' : ''}
                  onClick={() => setLang(item.code)}
                  aria-pressed={lang === item.code}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
