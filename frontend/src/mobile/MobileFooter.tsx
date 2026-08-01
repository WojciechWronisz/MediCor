import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';
import './MobileFooter.css';

export default function MobileFooter() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/medicor-logo-dark.png' : '/medicor-logo.png';

  return (
    <footer className="m-footer">
      <img src={logoSrc} alt="MediCor" className="m-footer-logo" />
      <p>&copy; 2026 {t.footer.rights}</p>
      <p className="m-footer-muted">ul. Traugutta 7, 11-400 Kętrzyn</p>
      <p className="m-footer-contact">
        <a href="tel:+48897522703">89 752 27 03</a>
        {' · '}
        {t.footer.emailSoon}
      </p>
    </footer>
  );
}
