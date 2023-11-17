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
      aemail: 'junior@example.com',
      fname: 'Alex',
      mname: 'J.',
      lname1: 'Gonzalez',
      lname2: 'Perez',
      edad: 4,
      category: '',
      tiempocompletado: 120.5,
    },
    {
      aemail: 'open@example.com',
      fname: 'Carlos',
      mname: 'E.',
      lname1: 'Vega',
      lname2: 'Lopez',
      edad: 16,
      category: '',
      tiempocompletado: 105.75,
    },
    {
      aemail: 'mastera@example.com',
      fname: 'Sofia',
      mname: 'R.',
      lname1: 'Díaz',
      lname2: 'Martínez',
      edad: 25,
      category: '',
      tiempocompletado: 130.2,
    },
    {
      aemail: 'runner4@example.com',
      fname: 'David',
      mname: 'E.',
      lname1: 'Rodríguez',
      lname2: 'López',
      edad: 31,
      category: '',
      tiempocompletado: 98.3,
    },
    {
      aemail: 'runner5@example.com',
      fname: 'Elena',
      mname: 'F.',
      lname1: 'Pérez',
      lname2: 'Gutiérrez',
      edad: 45,
      category: '',
      tiempocompletado: 135.2,
    },
    {
      aemail: 'runner5@example.com',
      fname: 'Felip',
      mname: 'F.',
      lname1: 'Pérez',
      lname2: 'Guzma',
      edad: 45,
      category: '',
      tiempocompletado: 133.2,
    },
    {
      aemail: 'perro5@example.com',
      fname: 'Marco',
      mname: 'F.',
      lname1: 'Pérez',
      lname2: 'Gutiérrez',
      edad: 63,
      category: '',
      tiempocompletado: 135.2,
    },
    // ...otros atletas
  ],
};
