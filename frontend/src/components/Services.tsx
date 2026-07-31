import React, { useEffect, useState } from 'react';
import { API_ENABLED, fetchJson } from '../api';
import Reveal from './Reveal';
import './Services.css';

interface ServiceSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: ServiceSection[];
}

const USLUGI: Service[] = [
  {
    id: '1',
    title: 'Konsultacja Kardiologiczna',
    description:
      'Spokojna rozmowa z kardiologiem i wstępne badanie — bez zbędnego stresu, z jasnym planem dalszego postępowania.',
    icon: 'heart-pulse',
    details: [
      {
        heading: 'Czym jest to badanie/wizyta?',
        paragraphs: [
          'To po prostu spokojna rozmowa ze specjalistą od serca (kardiologiem) połączona ze wstępnym badaniem. Nie musisz się do niej specjalnie przygotowywać ani niczego obawiać – lekarz jest po to, aby wysłuchać Twoich dolegliwości i pomóc Ci zrozumieć, co dzieje się z Twoim organizmem.',
        ],
      },
      {
        heading: 'Jak wygląda wizyta krok po kroku?',
        list: [
          'Rozmowa (wywiad lekarski): Lekarz zapyta Cię o objawy (np. kłucie w piersiach, duszności, szybsze bicie serca, zmęczenie), Twój styl życia, przyjmowane leki oraz choroby w rodzinie.',
          'Przegląd wyników: Jeśli masz ze sobą dotychczasowe wyniki badań (np. morfologię krwi, wcześniejsze EKG), lekarz je dokładnie przeanalizuje.',
          'Podstawowe badanie: Lekarz osłucha Twoje serce i płuca stetoskopem oraz zmierzy ciśnienie tętnicze.',
          'Plan działania: Na koniec dowiesz się, czy wszystko jest w porządku, czy potrzebujesz dodatkowych badań lub zmiany leków.',
        ],
      },
      {
        heading: 'Co ze sobą zabrać?',
        paragraphs: [
          'Spis przyjmowanych leków oraz swoją dotychczasową dokumentację medyczną.',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Echo Serca (Echokardiografia)',
    description:
      'USG serca — bezbolesne badanie, dzięki któremu lekarz „widzi” pracę serca i zastawek na żywo.',
    icon: 'waveform',
    details: [
      {
        heading: 'Czym jest to badanie?',
        paragraphs: [
          'Mówiąc najprościej – to USG serca. Badanie pozwala lekarzowi „zobaczyć” Twoje serce na żywo na ekranie monitora: jak się kurczy, jak pompuje krew oraz czy jego zastawki pracują prawidłowo. Badanie jest całkowicie bezbolesne, nieinwazyjne i bezpieczne.',
        ],
      },
      {
        heading: 'Jak wygląda badanie krok po kroku?',
        list: [
          'Zostaniesz poproszony o odsłonięcie górnej części ciała i położenie się na kozetce (najczęściej na lewym boku).',
          'Lekarz nałoży na klatkę piersiową chłodny żel (taki sam jak przy standardowym USG brzucha).',
          'Przykładając głowicę aparatu w różne miejsca na klatce piersiowej, lekarz będzie obserwował obraz Twojego serca na ekranie.',
          'Całość trwa zazwyczaj od 15 do 20 minut, a wynik otrzymujesz od razu do ręki.',
        ],
      },
      {
        heading: 'Warto wiedzieć',
        paragraphs: ['Badanie nie wymaga żadnego wcześniejszego przygotowania.'],
      },
    ],
  },
  {
    id: '3',
    title: 'Próba Wysiłkowa EKG',
    description:
      'EKG podczas wysiłku — sprawdza, jak serce reaguje, gdy pracuje na wyższych obrotach.',
    icon: 'activity',
    details: [
      {
        heading: 'Czym jest to badanie?',
        paragraphs: [
          'To badanie EKG wykonywane w momencie, gdy Twoje serce pracuje na wyższych obrotach. Czasami w spoczynku serce bije prawidłowo, a ewentualne problemy ujawniają się dopiero podczas wysiłku. Badanie sprawdza, jak Twój układ krążenia radzi sobie z fizycznym obciążeniem.',
        ],
      },
      {
        heading: 'Jak wygląda badanie krok po kroku?',
        list: [
          'Do Twojej klatki piersiowej zostaną przyklejone elektrodowe naklejki połączone z aparatem EKG, a na ramię założony mankiet do mierzenia ciśnienia.',
          'Wejdziesz na bieżnię ruchomą lub usiądziesz na rowerku stacjonarnym.',
          'Zaczniesz spokojny ruch, a urządzenie stopniowo będzie zwiększać opór lub kąt nachylenia/prędkość.',
          'Przez cały czas lekarz i personel czuwają nad Twoim bezpieczeństwem, monitorując wykres serca i ciśnienie. Badanie kończy się po osiągnięciu odpowiedniego tętna lub gdy zgłosisz zmęczenie.',
        ],
      },
      {
        heading: 'Jak się przygotować?',
        list: [
          'Załóż wygodny strój sportowy i obuwie na płaskiej podeszwie.',
          'Nie jedz obfitego posiłku na 2 godziny przed badaniem i nie pij mocnej kawy czy energetyków.',
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Holter EKG i Ciśnieniowy',
    description:
      'Przenośne monitorowanie serca lub ciśnienia przez 24 godziny — w domu, w pracy i podczas snu.',
    icon: 'clock',
    details: [
      {
        heading: 'Czym jest to badanie?',
        paragraphs: [
          'To „mobilny diagnostyk”, którego zabierasz ze sobą do domu. Tradycyjne EKG czy pomiar ciśnienia w gabinecie trwają tylko chwilę. Holter to małe urządzenie, które nosisz przy pasku przez 24 godziny (lub dłużej), aby sprawdzić, jak Twoje serce i ciśnienie zachowują się podczas codziennych czynności – w pracy, podczas spaceru, a także w trakcie snu.',
        ],
      },
      {
        heading: 'Jak wygląda badanie krok po kroku?',
        list: [
          'Założenie aparatu w gabinecie.',
          'Holter EKG: Do klatki piersiowej przykleja się kilka elektrod, które kablami połączone są z małym pudełeczkiem noszonym przy pasku lub na szyi.',
          'Holter ciśnieniowy: Na ramię zakłada się mankiet (taki jak przy pomiarze ciśnienia), który pompuje się automatycznie co określony czas (np. co 15–30 minut w dzień i co godzinę w nocy).',
          'Powrót do domu: Wracasz do swoich normalnych, codziennych aktywności. Dostaniesz też kartkę (dzienniczek), w której zapisujesz ważniejsze momenty dnia (np. objawy, spacer, sen, zażycie leków).',
          'Zdjęcie aparatu: Po 24 h (lub wyznaczonym czasie) wracasz do poradni na oddanie sprzętu.',
        ],
      },
    ],
  },
];

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>(USLUGI);
  const [active, setActive] = useState<Service | null>(null);

  useEffect(() => {
    if (!API_ENABLED) return;

    let cancelled = false;
    fetchJson<{ id: string; title: string; description: string; icon: string }[]>('/services').then(
      (data) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        // Zachowujemy lokalne opisy szczegółowe; API może tylko podmienić krótkie opisy po id
        setServices((prev) =>
          prev.map((local) => {
            const fromApi = data.find((d) => d.id === local.id || d.title === local.title);
            return fromApi
              ? { ...local, description: fromApi.description || local.description, icon: fromApi.icon || local.icon }
              : local;
          })
        );
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

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
        <Reveal>
          <div className="section-header">
            <h2>
              Nasze Specjalistyczne <span>Usługi</span>
            </h2>
            <p>
              Oferujemy kompleksową diagnostykę i profesjonalne leczenie chorób układu krążenia przy
              użyciu nowoczesnego sprzętu medycznego. Kliknij kartę, aby przeczytać więcej.
            </p>
          </div>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.id} delayClass={`delay-${Math.min(index + 1, 4)}`}>
              <button
                type="button"
                className="service-card"
                onClick={() => setActive(service)}
                aria-haspopup="dialog"
              >
                <div className="service-icon-box">
                  <span className="icon">{renderIcon(service.icon)}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="learn-more">Dowiedz się więcej →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="service-modal-overlay"
          role="presentation"
          onClick={() => setActive(null)}
        >
          <div
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="service-modal-close"
              onClick={() => setActive(null)}
              aria-label="Zamknij"
            >
              ×
            </button>
            <div className="service-modal-icon" aria-hidden="true">
              {renderIcon(active.icon)}
            </div>
            <h3 id="service-modal-title">{active.title}</h3>
            <div className="service-modal-body">
              {active.details.map((section) => (
                <section key={section.heading} className="service-modal-section">
                  <h4>{section.heading}</h4>
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item.slice(0, 48)}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            <button type="button" className="btn btn-primary btn-block" onClick={() => setActive(null)}>
              Zamknij
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
