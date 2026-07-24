export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  firstName: string;
  lastName: string;
  degree: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'lek. spec. Krzysztof Wronisz',
    firstName: 'Krzysztof',
    lastName: 'Wronisz',
    degree: 'lek. spec.',
    specialty: 'Internista 2. stopnia / Spec. Kardiologia',
    bio: '30 lat doświadczenia w zawodzie',
    experienceYears: 30,
  },
];

export const services: Service[] = [
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
