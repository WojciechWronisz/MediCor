export type Lang = 'pl' | 'en' | 'ru';

export type ServiceDetailSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type ServiceCopy = {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: ServiceDetailSection[];
};

type Dict = {
  metaTitle: string;
  metaDescription: string;
  nav: {
    home: string;
    services: string;
    doctor: string;
    firstVisit: string;
    faq: string;
    contact: string;
  };
  hero: {
    titleBefore: string;
    titleAccent: string;
    subtitle: string;
    ctaContact: string;
    ctaServices: string;
    ctaPhone: string;
    bpm: string;
    stress: string;
    stressLow: string;
  };
  services: {
    title: string;
    titleAccent: string;
    subtitle: string;
    learnMore: string;
    close: string;
    items: ServiceCopy[];
  };
  doctor: {
    title: string;
    titleAccent: string;
    subtitle: string;
    learnMore: string;
    goContact: string;
    close: string;
    name: string;
    specialty: string;
    bio: string;
    details: ServiceDetailSection[];
  };
  firstVisit: {
    title: string;
    titleAccent: string;
    subtitle: string;
    badge: string;
    steps: { title: string; text: string }[];
  };
  faq: {
    title: string;
    titleAccent: string;
    subtitle: string;
    badge: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    titleAccent: string;
    subtitle: string;
    addressTitle: string;
    hoursTitle: string;
    contactTitle: string;
    phone: string;
    email: string;
    emailSoon: string;
    mon: string;
    tueThu: string;
    friSun: string;
    closed: string;
  };
  footer: {
    rights: string;
    emailSoon: string;
  };
  cta: {
    label: string;
    phoneDisplay: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  lang: {
    label: string;
  };
};

export const translations: Record<Lang, Dict> = {
  pl: {
    metaTitle: 'MediCor — Poradnia Kardiologiczna | Kętrzyn',
    metaDescription:
      'MediCor — poradnia kardiologiczna w Kętrzynie. Opieka kardiologiczna, diagnostyka i kontakt.',
    nav: {
      home: 'Strona główna',
      services: 'Usługi',
      doctor: 'Twój kardiolog',
      firstVisit: 'Pierwsza wizyta',
      faq: 'FAQ',
      contact: 'Kontakt',
    },
    hero: {
      titleBefore: 'Profesjonalna opieka kardiologiczna dla',
      titleAccent: 'Twojego serca',
      subtitle:
        'W MediCor łączymy nowoczesną diagnostykę z uważnym, spokojnym podejściem — tak, byś wiedział, co dzieje się z Twoim sercem.',
      ctaContact: 'Kontakt',
      ctaServices: 'Nasze usługi',
      ctaPhone: 'Umów wizytę telefonicznie',
      bpm: 'Tętno (BPM)',
      stress: 'Stres',
      stressLow: 'Niski',
    },
    services: {
      title: 'Nasze specjalistyczne',
      titleAccent: 'usługi',
      subtitle:
        'Kompleksowa diagnostyka i leczenie chorób układu krążenia. Kliknij kartę, aby przeczytać więcej.',
      learnMore: 'Dowiedz się więcej →',
      close: 'Zamknij',
      items: [
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
                'Rozmowa (wywiad lekarski): Lekarz zapyta Cię o objawy, styl życia, leki oraz choroby w rodzinie.',
                'Przegląd wyników: Jeśli masz dotychczasowe badania, lekarz je przeanalizuje.',
                'Podstawowe badanie: Osłuchanie serca i płuc oraz pomiar ciśnienia.',
                'Plan działania: Dowiesz się, czy wszystko jest w porządku, czy potrzebne są dalsze badania lub zmiana leczenia.',
              ],
            },
            {
              heading: 'Co ze sobą zabrać?',
              paragraphs: ['Spis przyjmowanych leków oraz dotychczasową dokumentację medyczną.'],
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
                'Mówiąc najprościej – to USG serca. Lekarz widzi na żywo, jak serce się kurczy, jak pompuje krew i jak pracują zastawki. Badanie jest bezbolesne, nieinwazyjne i bezpieczne.',
              ],
            },
            {
              heading: 'Jak wygląda badanie krok po kroku?',
              list: [
                'Odsłonięcie górnej części ciała i położenie na kozetce (najczęściej na lewym boku).',
                'Nałożenie chłodnego żelu na klatkę piersiową.',
                'Badanie głowicą USG — obraz serca na monitorze.',
                'Trwa zwykle 15–20 minut; wynik od razu do ręki.',
              ],
            },
            {
              heading: 'Warto wiedzieć',
              paragraphs: ['Badanie nie wymaga specjalnego przygotowania.'],
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
                'EKG wykonywane, gdy serce pracuje intensywniej. Niektóre problemy ujawniają się dopiero przy wysiłku — badanie sprawdza, jak układ krążenia radzi sobie z obciążeniem.',
              ],
            },
            {
              heading: 'Jak wygląda badanie krok po kroku?',
              list: [
                'Elektrody EKG na klatce piersiowej i mankiet ciśnieniowy na ramieniu.',
                'Bieżnia lub rowerek stacjonarny.',
                'Stopniowe zwiększanie obciążenia pod kontrolą personelu.',
                'Koniec po osiągnięciu odpowiedniego tętna lub przy zmęczeniu.',
              ],
            },
            {
              heading: 'Jak się przygotować?',
              list: [
                'Wygodny strój sportowy i obuwie na płaskiej podeszwie.',
                'Bez obfitego posiłku i mocnej kawy/energetyków na 2 godziny przed badaniem.',
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
                'Małe urządzenie noszone przez 24 godziny (lub dłużej), które rejestruje pracę serca lub ciśnienie podczas codziennych aktywności i snu.',
              ],
            },
            {
              heading: 'Jak wygląda badanie krok po kroku?',
              list: [
                'Założenie aparatu w gabinecie (elektrody lub mankiet).',
                'Powrót do codziennych zajęć z dzienniczkiem aktywności.',
                'Zwrot sprzętu w poradni po ustalonym czasie.',
              ],
            },
          ],
        },
      ],
    },
    doctor: {
      title: 'Twój',
      titleAccent: 'kardiolog',
      subtitle:
        'Profesjonalna opieka kardiologiczna oparta na wieloletnim doświadczeniu. Kliknij kartę, aby zobaczyć więcej.',
      learnMore: 'Dowiedz się więcej →',
      goContact: 'Przejdź do kontaktu',
      close: 'Zamknij',
      name: 'lek. spec. Krzysztof Wronisz',
      specialty: 'Internista 2. stopnia / Spec. Kardiologia',
      bio: '30 lat doświadczenia w zawodzie',
      details: [
        {
          heading: 'O lekarzu',
          paragraphs: ['Szczegółowy opis profilu lekarza pojawi się wkrótce.'],
        },
        {
          heading: 'Wykształcenie i specjalizacje',
          list: [
            'Internista 2. stopnia',
            'Specjalizacja: kardiologia',
            'Pozostałe pozycje — w przygotowaniu',
          ],
        },
        {
          heading: 'Doświadczenie zawodowe',
          paragraphs: [
            'Ponad 30 lat doświadczenia w zawodzie. Pełniejszy opis zostanie dodany w kolejnej aktualizacji.',
          ],
        },
        {
          heading: 'Zakres opieki',
          list: [
            'Konsultacje kardiologiczne',
            'Diagnostyka chorób układu krążenia',
            'Indywidualny plan dalszego postępowania',
          ],
        },
      ],
    },
    firstVisit: {
      title: 'Jak wygląda',
      titleAccent: 'pierwsza wizyta',
      subtitle: 'Przygotowujemy przejrzysty przewodnik dla pacjentów. Już wkrótce będzie dostępny.',
      badge: 'Wkrótce dostępne',
      steps: [
        {
          title: '1. Kontakt i umówienie',
          text: 'Zadzwoń do poradni — pomożemy dobrać dogodny termin i powiemy, co zabrać ze sobą.',
        },
        {
          title: '2. Spotkanie z kardiologiem',
          text: 'Spokojna rozmowa, wywiad i wstępne badanie — bez pośpiechu, z jasnymi wyjaśnieniami.',
        },
        {
          title: '3. Plan dalszych kroków',
          text: 'Otrzymasz rekomendacje: obserwacja, badania dodatkowe lub dalsze leczenie.',
        },
      ],
    },
    faq: {
      title: 'Najczęściej zadawane',
      titleAccent: 'pytania',
      subtitle: 'Sekcja FAQ jest w budowie. Wkrótce znajdziesz tu odpowiedzi na najważniejsze pytania.',
      badge: 'W budowie',
      items: [
        {
          q: 'Czy potrzebuję skierowania?',
          a: 'Treść odpowiedzi pojawi się wkrótce.',
        },
        {
          q: 'Jak dojechać do poradni?',
          a: 'Treść odpowiedzi pojawi się wkrótce.',
        },
        {
          q: 'Jak przygotować się do holtera?',
          a: 'Treść odpowiedzi pojawi się wkrótce.',
        },
      ],
    },
    contact: {
      title: 'Lokalizacja i',
      titleAccent: 'kontakt',
      subtitle: 'Zapraszamy do placówki w centrum Kętrzyna.',
      addressTitle: 'Adres placówki',
      hoursTitle: 'Godziny otwarcia',
      contactTitle: 'Dane kontaktowe',
      phone: 'Telefon',
      email: 'E-mail',
      emailSoon: 'wkrótce',
      mon: 'Poniedziałek',
      tueThu: 'Wtorek – Czwartek',
      friSun: 'Piątek – Niedziela',
      closed: 'zamknięte',
    },
    footer: {
      rights: 'MediCor — Poradnia Kardiologiczna. Wszelkie prawa zastrzeżone.',
      emailSoon: 'wkrótce',
    },
    cta: {
      label: 'Umów wizytę telefonicznie',
      phoneDisplay: '89 752 27 03',
    },
    theme: { light: 'Jasny', dark: 'Ciemny' },
    lang: { label: 'Język' },
  },
  en: {
    metaTitle: 'MediCor — Cardiology Clinic | Kętrzyn',
    metaDescription:
      'MediCor — cardiology clinic in Kętrzyn. Diagnostics, consultations and contact.',
    nav: {
      home: 'Home',
      services: 'Services',
      doctor: 'Your cardiologist',
      firstVisit: 'First visit',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      titleBefore: 'Professional cardiac care for',
      titleAccent: 'your heart',
      subtitle:
        'At MediCor we combine modern diagnostics with a calm, attentive approach — so you understand what is happening with your heart.',
      ctaContact: 'Contact',
      ctaServices: 'Our services',
      ctaPhone: 'Book by phone',
      bpm: 'Heart rate (BPM)',
      stress: 'Stress',
      stressLow: 'Low',
    },
    services: {
      title: 'Our specialist',
      titleAccent: 'services',
      subtitle: 'Comprehensive cardiovascular diagnostics and care. Tap a card to learn more.',
      learnMore: 'Learn more →',
      close: 'Close',
      items: [
        {
          id: '1',
          title: 'Cardiology consultation',
          description:
            'A calm conversation with a cardiologist and an initial exam — clear next steps, no unnecessary stress.',
          icon: 'heart-pulse',
          details: [
            {
              heading: 'What is this visit?',
              paragraphs: [
                'A conversation with a heart specialist combined with a basic examination. You do not need special preparation — the doctor is here to listen and help you understand your symptoms.',
              ],
            },
            {
              heading: 'How does the visit go?',
              list: [
                'Medical interview: symptoms, lifestyle, medicines and family history.',
                'Review of previous test results if you bring them.',
                'Basic exam: heart and lung auscultation and blood pressure.',
                'Action plan: observation, further tests or treatment changes.',
              ],
            },
            {
              heading: 'What to bring?',
              paragraphs: ['A list of medicines and your medical documentation.'],
            },
          ],
        },
        {
          id: '2',
          title: 'Echocardiography (Echo)',
          description: 'An ultrasound of the heart — painless imaging of heart motion and valves.',
          icon: 'waveform',
          details: [
            {
              heading: 'What is this test?',
              paragraphs: [
                'Simply put — a heart ultrasound. The doctor sees live how the heart contracts, pumps blood and how valves work. It is painless and non-invasive.',
              ],
            },
            {
              heading: 'How does it work?',
              list: [
                'You uncover the upper body and lie on the exam table (usually on the left side).',
                'Cool gel is applied to the chest.',
                'An ultrasound probe creates a live image of the heart.',
                'Usually 15–20 minutes; you get the result immediately.',
              ],
            },
            {
              heading: 'Good to know',
              paragraphs: ['No special preparation is required.'],
            },
          ],
        },
        {
          id: '3',
          title: 'Exercise ECG stress test',
          description: 'ECG during exercise — checks how your heart responds under load.',
          icon: 'activity',
          details: [
            {
              heading: 'What is this test?',
              paragraphs: [
                'An ECG recorded while your heart works harder. Some issues appear only during effort — this test evaluates circulation under physical load.',
              ],
            },
            {
              heading: 'How does it work?',
              list: [
                'ECG electrodes on the chest and a blood-pressure cuff on the arm.',
                'Treadmill or stationary bike.',
                'Gradual increase of intensity under staff supervision.',
                'Ends at target heart rate or when you feel exhausted.',
              ],
            },
            {
              heading: 'How to prepare?',
              list: [
                'Wear comfortable sportswear and flat shoes.',
                'Avoid a heavy meal and strong coffee/energy drinks for 2 hours before.',
              ],
            },
          ],
        },
        {
          id: '4',
          title: 'Holter ECG & blood pressure',
          description: 'Portable 24-hour monitoring of heart rhythm or blood pressure at home.',
          icon: 'clock',
          details: [
            {
              heading: 'What is this test?',
              paragraphs: [
                'A small device worn for 24 hours (or longer) that records heart activity or blood pressure during daily life and sleep.',
              ],
            },
            {
              heading: 'How does it work?',
              list: [
                'The device is fitted at the clinic (electrodes or a cuff).',
                'You return to normal activities with a short activity diary.',
                'Return the device after the agreed period.',
              ],
            },
          ],
        },
      ],
    },
    doctor: {
      title: 'Your',
      titleAccent: 'cardiologist',
      subtitle: 'Experienced cardiac care. Tap the card for more information.',
      learnMore: 'Learn more →',
      goContact: 'Go to contact',
      close: 'Close',
      name: 'Krzysztof Wronisz, MD specialist',
      specialty: '2nd-degree internist / Cardiology',
      bio: '30 years of professional experience',
      details: [
        {
          heading: 'About the doctor',
          paragraphs: ['A detailed profile will be available soon.'],
        },
        {
          heading: 'Education & specialties',
          list: [
            '2nd-degree internist',
            'Specialty: cardiology',
            'More details coming soon',
          ],
        },
        {
          heading: 'Professional experience',
          paragraphs: [
            'Over 30 years in practice. A fuller biography will be added soon.',
          ],
        },
        {
          heading: 'Scope of care',
          list: [
            'Cardiology consultations',
            'Cardiovascular diagnostics',
            'Individual follow-up plans',
          ],
        },
      ],
    },
    firstVisit: {
      title: 'What the',
      titleAccent: 'first visit looks like',
      subtitle: 'We are preparing a clear patient guide. It will be available soon.',
      badge: 'Coming soon',
      steps: [
        {
          title: '1. Contact & booking',
          text: 'Call the clinic — we will help choose a convenient time and tell you what to bring.',
        },
        {
          title: '2. Meeting the cardiologist',
          text: 'A calm conversation, interview and basic exam — without rush, with clear explanations.',
        },
        {
          title: '3. Next steps',
          text: 'You will receive recommendations: observation, further tests or treatment.',
        },
      ],
    },
    faq: {
      title: 'Frequently asked',
      titleAccent: 'questions',
      subtitle: 'The FAQ section is under construction. Key answers will appear here soon.',
      badge: 'Under construction',
      items: [
        { q: 'Do I need a referral?', a: 'The answer will be published soon.' },
        { q: 'How do I get to the clinic?', a: 'The answer will be published soon.' },
        { q: 'How should I prepare for a Holter?', a: 'The answer will be published soon.' },
      ],
    },
    contact: {
      title: 'Location &',
      titleAccent: 'contact',
      subtitle: 'Visit us in the centre of Kętrzyn.',
      addressTitle: 'Clinic address',
      hoursTitle: 'Opening hours',
      contactTitle: 'Contact details',
      phone: 'Phone',
      email: 'Email',
      emailSoon: 'coming soon',
      mon: 'Monday',
      tueThu: 'Tuesday – Thursday',
      friSun: 'Friday – Sunday',
      closed: 'closed',
    },
    footer: {
      rights: 'MediCor — Cardiology Clinic. All rights reserved.',
      emailSoon: 'coming soon',
    },
    cta: {
      label: 'Book an appointment by phone',
      phoneDisplay: '89 752 27 03',
    },
    theme: { light: 'Light', dark: 'Dark' },
    lang: { label: 'Language' },
  },
  ru: {
    metaTitle: 'MediCor — Кардиологическая клиника | Кентшин',
    metaDescription:
      'MediCor — кардиологическая клиника в Кентшине. Диагностика, консультации и контакты.',
    nav: {
      home: 'Главная',
      services: 'Услуги',
      doctor: 'Ваш кардиолог',
      firstVisit: 'Первый визит',
      faq: 'FAQ',
      contact: 'Контакты',
    },
    hero: {
      titleBefore: 'Профессиональная кардиологическая помощь для',
      titleAccent: 'вашего сердца',
      subtitle:
        'В MediCor мы сочетаем современную диагностику с внимательным и спокойным подходом — чтобы вы понимали, что происходит с вашим сердцем.',
      ctaContact: 'Контакты',
      ctaServices: 'Наши услуги',
      ctaPhone: 'Запись по телефону',
      bpm: 'Пульс (уд/мин)',
      stress: 'Стресс',
      stressLow: 'Низкий',
    },
    services: {
      title: 'Наши специализированные',
      titleAccent: 'услуги',
      subtitle:
        'Комплексная диагностика и лечение заболеваний сердечно-сосудистой системы. Нажмите на карточку, чтобы узнать подробнее.',
      learnMore: 'Узнать подробнее →',
      close: 'Закрыть',
      items: [
        {
          id: '1',
          title: 'Кардиологическая консультация',
          description:
            'Спокойная беседа с кардиологом и первичный осмотр — без лишнего стресса, с понятным планом дальнейшего ведения.',
          icon: 'heart-pulse',
          details: [
            {
              heading: 'Что представляет собой этот приём?',
              paragraphs: [
                'Это спокойная беседа со специалистом по заболеваниям сердца (кардиологом) в сочетании с первичным осмотром. Специальная подготовка не требуется, и бояться нечего: врач выслушает ваши жалобы и поможет понять, что происходит с организмом.',
              ],
            },
            {
              heading: 'Как проходит приём шаг за шагом?',
              list: [
                'Беседа (сбор анамнеза): врач спросит о симптомах, образе жизни, принимаемых препаратах и заболеваниях в семье.',
                'Просмотр результатов: если у вас есть предыдущие обследования, врач их тщательно проанализирует.',
                'Базовый осмотр: аускультация сердца и лёгких, измерение артериального давления.',
                'План действий: вы узнаете, всё ли в порядке, нужны ли дополнительные исследования или изменение лечения.',
              ],
            },
            {
              heading: 'Что взять с собой?',
              paragraphs: [
                'Список принимаемых лекарственных препаратов и имеющуюся медицинскую документацию.',
              ],
            },
          ],
        },
        {
          id: '2',
          title: 'Эхокардиография (ЭхоКГ)',
          description:
            'УЗИ сердца — безболезненное исследование, благодаря которому врач «видит» работу сердца и клапанов в реальном времени.',
          icon: 'waveform',
          details: [
            {
              heading: 'Что представляет собой это исследование?',
              paragraphs: [
                'Проще говоря — это УЗИ сердца. Врач в реальном времени наблюдает, как сердце сокращается, как перекачивает кровь и как работают клапаны. Исследование полностью безболезненное, неинвазивное и безопасное.',
              ],
            },
            {
              heading: 'Как проходит исследование шаг за шагом?',
              list: [
                'Вас попросят освободить верхнюю часть тела и лечь на кушетку (чаще всего на левый бок).',
                'На грудную клетку наносится прохладный гель (как при обычном УЗИ брюшной полости).',
                'Прикладывая датчик в разные точки на груди, врач наблюдает изображение сердца на мониторе.',
                'Обычно исследование занимает 15–20 минут; результат выдаётся сразу на руки.',
              ],
            },
            {
              heading: 'Важно знать',
              paragraphs: ['Специальной предварительной подготовки исследование не требует.'],
            },
          ],
        },
        {
          id: '3',
          title: 'Нагрузочная проба ЭКГ',
          description:
            'ЭКГ при физической нагрузке — позволяет оценить, как сердце реагирует, когда работает с повышенной интенсивностью.',
          icon: 'activity',
          details: [
            {
              heading: 'Что представляет собой это исследование?',
              paragraphs: [
                'Это ЭКГ, выполняемое в момент, когда сердце работает интенсивнее. Иногда в покое сердце бьётся нормально, а возможные нарушения проявляются только при нагрузке. Исследование проверяет, как сердечно-сосудистая система справляется с физической нагрузкой.',
              ],
            },
            {
              heading: 'Как проходит исследование шаг за шагом?',
              list: [
                'На грудную клетку накладывают электроды ЭКГ, а на руку — манжету для измерения артериального давления.',
                'Вы встаёте на беговую дорожку или садитесь на велоэргометр.',
                'Начинаете спокойное движение; устройство постепенно увеличивает сопротивление или угол наклона/скорость.',
                'Всё время врач и персонал контролируют безопасность, мониторя ЭКГ и давление. Исследование заканчивается при достижении целевой частоты пульса или при появлении усталости.',
              ],
            },
            {
              heading: 'Как подготовиться?',
              list: [
                'Наденьте удобную спортивную одежду и обувь на плоской подошве.',
                'Не ешьте плотно и не пейте крепкий кофе или энергетические напитки за 2 часа до исследования.',
              ],
            },
          ],
        },
        {
          id: '4',
          title: 'Холтеровское мониторирование ЭКГ и АД',
          description:
            'Портативный мониторинг сердца или артериального давления в течение 24 часов — дома, на работе и во время сна.',
          icon: 'clock',
          details: [
            {
              heading: 'Что представляет собой это исследование?',
              paragraphs: [
                'Это «мобильный диагностический прибор», который вы забираете с собой домой. Обычное ЭКГ или измерение давления в кабинете длятся лишь мгновение. Холтер — небольшое устройство, которое носят на поясе 24 часа (или дольше), чтобы оценить, как сердце и давление ведут себя в повседневной жизни: на работе, на прогулке и во сне.',
              ],
            },
            {
              heading: 'Как проходит исследование шаг за шагом?',
              list: [
                'Установка аппарата в кабинете.',
                'Холтер ЭКГ: на грудную клетку наклеивают несколько электродов, соединённых кабелями с небольшим блоком на поясе или на шее.',
                'Холтер АД: на руку надевают манжету, которая автоматически накачивается через заданные интервалы (например, каждые 15–30 минут днём и каждый час ночью).',
                'Возврат к обычным делам: вы продолжаете повседневную активность. Вам также выдадут дневник для записи важных моментов (симптомы, прогулка, сон, приём лекарств).',
                'Снятие аппарата: через 24 часа (или в назначенное время) вы возвращаете оборудование в клинику.',
              ],
            },
          ],
        },
      ],
    },
    doctor: {
      title: 'Ваш',
      titleAccent: 'кардиолог',
      subtitle:
        'Профессиональная кардиологическая помощь, основанная на многолетнем клиническом опыте. Нажмите на карточку, чтобы узнать подробнее.',
      learnMore: 'Узнать подробнее →',
      goContact: 'Перейти к контактам',
      close: 'Закрыть',
      name: 'лек. спец. Кшиштоф Врониш',
      specialty: 'Врач-интернист 2 степени / Специалист по кардиологии',
      bio: '30 лет профессионального стажа',
      details: [
        {
          heading: 'О враче',
          paragraphs: ['Подробное описание профиля врача появится в ближайшее время.'],
        },
        {
          heading: 'Образование и специализации',
          list: [
            'Врач-интернист 2 степени',
            'Специализация: кардиология',
            'Остальные сведения — в подготовке',
          ],
        },
        {
          heading: 'Профессиональный опыт',
          paragraphs: [
            'Более 30 лет профессиональной практики. Более полное описание будет добавлено в следующем обновлении материалов.',
          ],
        },
        {
          heading: 'Направления помощи',
          list: [
            'Кардиологические консультации',
            'Диагностика заболеваний сердечно-сосудистой системы',
            'Индивидуальный план дальнейшего ведения',
          ],
        },
      ],
    },
    firstVisit: {
      title: 'Как проходит',
      titleAccent: 'первый визит',
      subtitle:
        'Мы готовим понятный путеводитель для пациентов. В ближайшее время он станет доступен.',
      badge: 'Скоро будет доступно',
      steps: [
        {
          title: '1. Связь и запись на приём',
          text: 'Позвоните в клинику — поможем подобрать удобное время и подскажем, что взять с собой.',
        },
        {
          title: '2. Встреча с кардиологом',
          text: 'Спокойная беседа, сбор анамнеза и первичный осмотр — без спешки, с ясными разъяснениями.',
        },
        {
          title: '3. План дальнейших шагов',
          text: 'Вы получите рекомендации: наблюдение, дополнительные обследования или дальнейшее лечение.',
        },
      ],
    },
    faq: {
      title: 'Часто задаваемые',
      titleAccent: 'вопросы',
      subtitle:
        'Раздел FAQ находится в разработке. В ближайшее время здесь появятся ответы на важнейшие вопросы.',
      badge: 'В разработке',
      items: [
        {
          q: 'Нужно ли направление?',
          a: 'Текст ответа появится в ближайшее время.',
        },
        {
          q: 'Как добраться до клиники?',
          a: 'Текст ответа появится в ближайшее время.',
        },
        {
          q: 'Как подготовиться к холтеровскому мониторированию?',
          a: 'Текст ответа появится в ближайшее время.',
        },
      ],
    },
    contact: {
      title: 'Адрес и',
      titleAccent: 'контакты',
      subtitle: 'Приглашаем в нашу клинику в центре Кентшина.',
      addressTitle: 'Адрес клиники',
      hoursTitle: 'Часы работы',
      contactTitle: 'Контактные данные',
      phone: 'Телефон',
      email: 'Электронная почта',
      emailSoon: 'скоро',
      mon: 'Понедельник',
      tueThu: 'Вторник – Четверг',
      friSun: 'Пятница – Воскресенье',
      closed: 'закрыто',
    },
    footer: {
      rights: 'MediCor — Кардиологическая клиника. Все права защищены.',
      emailSoon: 'скоро',
    },
    cta: {
      label: 'Запись на приём по телефону',
      phoneDisplay: '89 752 27 03',
    },
    theme: { light: 'Светлая', dark: 'Тёмная' },
    lang: { label: 'Язык' },
  },
};
