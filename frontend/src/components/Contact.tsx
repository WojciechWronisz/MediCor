import React from 'react';
import Reveal from './Reveal';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2>
              Lokalizacja i <span>kontakt</span>
            </h2>
            <p>Zapraszamy do naszej placówki w centrum Kętrzyna. Jesteśmy do Państwa dyspozycji.</p>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal delayClass="delay-1">
            <div className="contact-info-panel">
              <div className="contact-block">
                <h3>Adres placówki</h3>
                <p>
                  ul. Traugutta 7
                  <br />
                  11-400 Kętrzyn
                </p>
              </div>

              <div className="contact-block">
                <h3>Godziny otwarcia</h3>
                <ul className="hours-list">
                  <li>
                    <span>Poniedziałek</span>
                    <strong>13:00 – 18:00</strong>
                  </li>
                  <li>
                    <span>Wtorek – Czwartek</span>
                    <strong>8:00 – 13:00</strong>
                  </li>
                  <li>
                    <span>Piątek – Niedziela</span>
                    <strong>zamknięte</strong>
                  </li>
                </ul>
              </div>

              <div className="contact-block">
                <h3>Dane kontaktowe</h3>
                <p>
                  Telefon: <a href="tel:+48897522703">89 752 27 03</a>
                  <br />
                  E-mail: wkrótce
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayClass="delay-2">
            <div className="map-wrapper">
              <iframe
                title="Mapa – ul. Traugutta 7, 11-400 Kętrzyn"
                src="https://maps.google.com/maps?q=ul.+Traugutta+7,+11-400+K%C4%99trzyn&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
