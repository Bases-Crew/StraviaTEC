export interface Race {
  raceName: string;
  price: number;
  date: string;
  route?: string;
  privacy: number;
  sportName: string;
  sponsors: string[];
  categories: string[];
  bankAccounts: number[];
  groups: string[];
}

// Ejemplo de carreras
export const races: Race[] = [
  {
    raceName: 'Maratón de la Ciudad',
    price: 50,
    date: '2023-12-05',
    route: 'Centro de la ciudad - Parque grande',
    privacy: 1,
    sportName: 'Atletismo',
    sponsors: ['Adidas', 'Red Bull'],
    categories: ['Profesional', 'Amateur'],
    bankAccounts: [12345678, 87654321],
    groups: ['Adultos', 'Jóvenes'],
  },
  {
    raceName: 'Carrera Familiar 5K',
    price: 20,
    date: '2023-06-15',
    route: 'Parque local - Río',
    privacy: 1,
    sportName: 'Caminata',
    sponsors: ['Nike', 'Gatorade'],
    categories: ['Familias'],
    bankAccounts: [11223344, 55667788],
    groups: ['Familias', 'Niños'],
  },
  {
    raceName: 'Triatlón Costa Playa',
    price: 100,
    date: '2024-03-21',
    route: 'Playa - Montaña - Ciudad',
    privacy: 2,
    sportName: 'Triatlón',
    sponsors: ['Speedo', 'Garmin'],
    categories: ['Elite', 'Intermedio', 'Principiante'],
    bankAccounts: [98765432, 12345678],
    groups: ['Adultos'],
  },
  {
    raceName: 'Carrera de Obstáculos Juvenil',
    price: 30,
    date: '2023-09-10',
    route: 'Circuito de aventuras',
    privacy: 1,
    sportName: 'Obstáculos',
    sponsors: ['Under Armour', 'Powerade'],
    categories: ['Juvenil'],
    bankAccounts: [22334455, 55667788],
    groups: ['Jóvenes'],
  },
];

export default races;
