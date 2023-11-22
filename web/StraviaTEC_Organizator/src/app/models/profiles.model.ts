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

export interface RaceEvent {
  races: Report[];
}

export const raceEventExample: RaceEvent = {
  races: [
    {
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
        // ...otros atletas
      ],
    },
  ],
};
