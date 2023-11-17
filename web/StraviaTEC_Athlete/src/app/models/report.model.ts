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
      aemail: 'runner1@example.com',
      fname: 'Jane',
      mname: 'A.',
      lname1: 'Doe',
      lname2: 'Smith',
      edad: 27,
      category: 'Elite',
      tiempocompletado: 123.45,
    },
    {
      aemail: 'runner2@example.com',
      fname: 'John',
      mname: 'B.',
      lname1: 'Doe',
      lname2: 'Smith',
      edad: 30,
      category: 'Amateur',
      tiempocompletado: 146.0,
    },
    {
      aemail: 'runner3@example.com',
      fname: 'Maria',
      mname: 'C.',
      lname1: 'García',
      lname2: 'Martínez',
      edad: 35,
      category: 'Amateur',
      tiempocompletado: 162.75,
    },
    {
      aemail: 'runner4@example.com',
      fname: 'David',
      mname: 'E.',
      lname1: 'Rodríguez',
      lname2: 'López',
      edad: 42,
      category: 'Elite',
      tiempocompletado: 98.3,
    },
    {
      aemail: 'runner5@example.com',
      fname: 'Elena',
      mname: 'F.',
      lname1: 'Pérez',
      lname2: 'Gutiérrez',
      edad: 29,
      category: 'Amateur',
      tiempocompletado: 135.2,
    },
    // ...otros atletas
  ],
};
