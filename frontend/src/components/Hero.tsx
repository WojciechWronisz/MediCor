import { useI18n } from '../i18n/I18nContext';
import './Hero.css';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-text">
          <p className="hero-brand">MediCor</p>
          <h1>
            {t.hero.titleBefore} <span>{t.hero.titleAccent}</span>
          </h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-primary">
              {t.hero.ctaContact}
            </a>
            <a href="#services" className="btn btn-secondary">
              {t.hero.ctaServices}
            </a>
            <a href="tel:+48897522703" className="btn btn-ghost">
              {t.hero.ctaPhone}
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="heart-card">
            <div className="heart-icon">❤</div>
            <div className="pulse-line"></div>
            <div className="stat-grid">
              <div className="stat">
                <span>{t.hero.bpm}</span>
                <strong>72</strong>
              </div>
              <div className="stat">
                <span>{t.hero.stress}</span>
                <strong>{t.hero.stressLow}</strong>
              </div>
            </div>
          </div>
          <div className="accent-circle"></div>
        </div>
      </div>
    </section>
  );
}
