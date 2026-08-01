import { useI18n } from '../i18n/I18nContext';
import './MobileHero.css';

export default function MobileHero() {
  const { t } = useI18n();

  return (
    <section className="m-hero" id="home">
      <p className="m-hero-brand">MediCor</p>
      <h1>
        {t.hero.titleBefore} <span>{t.hero.titleAccent}</span>
      </h1>
      <p className="m-hero-sub">{t.hero.subtitle}</p>
      <div className="m-hero-actions">
        <a href="tel:+48897522703" className="m-btn m-btn-primary">
          {t.hero.ctaPhone}
        </a>
        <a href="#contact" className="m-btn m-btn-secondary">
          {t.hero.ctaContact}
        </a>
      </div>
      <div className="m-hero-accent" aria-hidden="true" />
    </section>
  );
}
