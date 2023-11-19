export interface Report {
  raceId: number;
  rname: string;
  price: number;
  rdate: Date;
  sportname: string;
  athletes: Athlete[];
}

export interface Athlete {
  aemail: string;
  fname: string;
  mname?: string;
  lname1: string;
  lname2: string;
  edad: number;
  isWinner?: boolean;
  category: string;
  tiempocompletado?: number;
}

export const reportExample: Report = {
  raceId: 1,
  rname: 'City Marathon',
  price: 100.0,
  rdate: new Date('2023-11-16'),
  sportname: 'Running',

  athletes: [
    {
      aemail: 'junior2@example.com',
      fname: 'Mia',
      mname: 'L.',
      lname1: 'Torres',
      lname2: 'Ruiz',
      edad: 12,
      category: '',
      tiempocompletado: 115.3,
    },
    {
      aemail: 'junior3@example.com',
      fname: 'Lucas',
      mname: 'M.',
      lname1: 'Ortiz',
      lname2: 'Santos',
      edad: 10,
      category: '',
      tiempocompletado: 118.4,
    },
    {
      aemail: 'junior4@example.com',
      fname: 'Emma',
      mname: 'G.',
      lname1: 'Soto',
      lname2: 'Vargas',
      edad: 14,
      category: '',
      tiempocompletado: 120.0,
    },
    {
      aemail: 'sub23-2@example.com',
      fname: 'Daniel',
      mname: 'P.',
      lname1: 'Castillo',
      lname2: 'Ramírez',
      edad: 20,
      category: '',
      tiempocompletado: 108.6,
    },
    {
      aemail: 'sub23-3@example.com',
      fname: 'Isabella',
      mname: 'Q.',
      lname1: 'Flores',
      lname2: 'García',
      edad: 17,
      category: '',
      tiempocompletado: 110.7,
    },
    {
      aemail: 'sub23-4@example.com',
      fname: 'Gabriel',
      mname: 'R.',
      lname1: 'Rivera',
      lname2: 'Molina',
      edad: 22,
      category: '',
      tiempocompletado: 103.5,
    },
    {
      aemail: 'open2@example.com',
      fname: 'Laura',
      mname: 'S.',
      lname1: 'Gómez',
      lname2: 'Cruz',
      edad: 29,
      category: '',
      tiempocompletado: 99.2,
    },
    {
      aemail: 'open3@example.com',
      fname: 'Jorge',
      mname: 'T.',
      lname1: 'Morales',
      lname2: 'Reyes',
      edad: 26,
      category: '',
      tiempocompletado: 102.8,
    },
    {
      aemail: 'open4@example.com',
      fname: 'Ana',
      mname: 'U.',
      lname1: 'Moreno',
      lname2: 'Jiménez',
      edad: 27,
      category: '',
      tiempocompletado: 97.6,
    },
    {
      aemail: 'elite2@example.com',
      fname: 'Roberto',
      mname: 'V.',
      lname1: 'Méndez',
      lname2: 'Núñez',
      edad: 35,
      category: '',
      tiempocompletado: 94.5,
    },
    {
      aemail: 'elite3@example.com',
      fname: 'Carmen',
      mname: 'W.',
      lname1: 'Rojas',
      lname2: 'Navarro',
      edad: 33,
      category: '',
      tiempocompletado: 96.7,
    },
    {
      aemail: 'elite4@example.com',
      fname: 'Oscar',
      mname: 'X.',
      lname1: 'Herrera',
      lname2: 'Dominguez',
      edad: 28,
      category: '',
      tiempocompletado: 95.4,
    },
    {
      aemail: 'masterb2@example.com',
      fname: 'Jose',
      mname: 'B.',
      lname1: 'Gil',
      lname2: 'Delgado',
      edad: 49,
      category: '',
      tiempocompletado: 111.8,
    },
    {
      aemail: 'masterb3@example.com',
      fname: 'María',
      mname: 'C.',
      lname1: 'Hernández',
      lname2: 'Romero',
      edad: 42,
      category: '',
      tiempocompletado: 113.4,
    },
    {
      aemail: 'masterb4@example.com',
      fname: 'Eduardo',
      mname: 'D.',
      lname1: 'García',
      lname2: 'Ortega',
      edad: 47,
      category: '',
      tiempocompletado: 116.0,
    },
    {
      aemail: 'masterc2@example.com',
      fname: 'Rosa',
      mname: 'E.',
      lname1: 'Martínez',
      lname2: 'Gómez',
      edad: 54,
      category: '',
      tiempocompletado: 120.7,
    },
    {
      aemail: 'masterc3@example.com',
      fname: 'Antonio',
      mname: 'F.',
      lname1: 'López',
      lname2: 'Bravo',
      edad: 59,
      category: '',
      tiempocompletado: 122.5,
    },

    // ...otros atletas
  ],
};
