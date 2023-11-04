// challenge.model.ts
export interface Challenge {
  id: number;
  challenge_name: string;
  description: string;
  challenge_type: string;
  start_date: Date;
  final_date: Date;
  // Aquí podrías añadir más propiedades según lo que quieras mostrar, como imágenes, distancias, etc.
}

export const challengesList: Challenge[] = [
  {
    id: 1,
    challenge_name: 'Conquista la Montaña',
    description:
      'Desafío de ciclismo de montaña con rutas de diversos niveles.',
    challenge_type: 'Ride',
    start_date: new Date('2023-07-01'),
    final_date: new Date('2023-07-31'),
  },
  {
    id: 2,
    challenge_name: 'Maratón Urbano',
    description:
      'Un reto para corredores urbanos, recorre la ciudad de punta a punta.',
    challenge_type: 'Run',
    start_date: new Date('2023-09-01'),
    final_date: new Date('2023-09-30'),
  },
  {
    id: 3,
    challenge_name: 'Desafío Acuático',
    description: 'Nada a través de lagos y ríos en este desafío refrescante.',
    challenge_type: 'Swim',
    start_date: new Date('2023-08-15'),
    final_date: new Date('2023-09-15'),
  },
  {
    id: 4,
    challenge_name: 'Paseo por la Naturaleza',
    description:
      'Explora senderos y disfruta de la naturaleza mientras caminas.',
    challenge_type: 'Walk',
    start_date: new Date('2023-10-01'),
    final_date: new Date('2023-10-31'),
  },
  {
    id: 5,
    challenge_name: 'Ascenso a la Cima',
    description: 'Escala las montañas más altas en este desafío de altura.',
    challenge_type: 'Hike',
    start_date: new Date('2023-06-01'),
    final_date: new Date('2023-06-30'),
  },
  // Puedes añadir más challenges aquí
];
