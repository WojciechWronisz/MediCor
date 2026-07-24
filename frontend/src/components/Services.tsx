import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';
import './Services.css';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const USLUGI_AWARYJNE: Service[] = [
  {
    id: '1',
    title: 'Konsultacja Kardiologiczna',
    description:
      'Kompleksowa ocena stanu zdrowia układu krążenia, interpretacja wyników badań oraz dobór optymalnej, spersonalizowanej ścieżki leczenia.',
    icon: 'heart-pulse',
  },
  {
    id: '2',
    title: 'Echo Serca (Echokardiografia)',
    description:
      'Zaawansowane badanie ultrasonograficzne (USG serca) pozwalające na ocenę budowy anatomicznej, pracy zastawek oraz kurczliwości mięśnia sercowego.',
    icon: 'waveform',
  },
  {
    id: '3',
    title: 'Próba Wysiłkowa EKG',
    description:
      'Ocena wydolności krążeniowej i pracy serca podczas kontrolowanego wysiłku fizycznego na bieżni ruchomej lub cykloergometrze.',
    icon: 'activity',
  },
  {
    id: '4',
    title: 'Holter EKG i Ciśnieniowy',
    description:
      '24-godzinne lub wielodobowe ciągłe monitorowanie pracy serca bądź ciśnienia tętniczego podczas codziennych aktywności pacjenta.',
    icon: 'clock',
  },
];

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>(USLUGI_AWARYJNE);

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((res) => res.json())
      .then((data: Service[]) => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => {
        /* używamy listy awaryjnej */
      });
  }, []);

  // Ikony usług na podstawie identyfikatora z API
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart-pulse':
        return '❤️';
      case 'waveform':
        return '📈';
      case 'activity':
        return '⚡';
      case 'clock':
        return '🕒';
      default:
        return '◈';
    }
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <h2>
            Nasze Specjalistyczne <span>Usługi</span>
          </h2>
          <p>
            Oferujemy kompleksową diagnostykę i profesjonalne leczenie chorób układu krążenia przy
            użyciu nowoczesnego sprzętu medycznego.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-box">
                <span className="icon">{renderIcon(service.icon)}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="learn-more">
                Dowiedz się więcej →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
