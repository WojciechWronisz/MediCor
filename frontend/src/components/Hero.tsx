import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Profesjonalna Opieka Kardiologiczna dla <span>Twojego Serca</span></h1>
          <p>
            W MediCor łączymy najnowocześniejszą technologię medyczną z pełnym empatii podejściem, 
            aby zapewnić najwyższy standard diagnostyki i leczenia kardiologicznego dla Ciebie i Twoich bliskich.
          </p>
          <div className="hero-btns">
            {/* <a href="#appointments" className="btn btn-primary">Zarezerwuj Wizytę</a> */}
            <a href="#contact" className="btn btn-primary">Kontakt</a>
            <a href="#services" className="btn btn-secondary">Nasze Usługi</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="heart-card">
            <div className="heart-icon">❤</div>
            <div className="pulse-line"></div>
            <div className="stat-grid">
              <div className="stat"><span>Tętno (BPM)</span><strong>72</strong></div>
              <div className="stat"><span>Stres</span><strong>Niski</strong></div>
            </div>
          </div>
          <div className="accent-circle"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
