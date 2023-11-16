// challenge.model.ts
export interface Challenge {
  id: number;
  challenge_name: string;
  description: string;
  challenge_type: string;
  start_date: Date;
  final_date: Date;
}

export const challengesList: Challenge[] = [
  // Desafíos de tipo 'Run'
  {
    id: 1,
    challenge_name: 'Maratón de la Ciudad',
    description:
      'Corre un total de 42.2 km (26.2 millas) a través de la ciudad.',
    challenge_type: 'Run',
    start_date: new Date('2023-07-01'),
    final_date: new Date('2023-07-31'),
  },
  {
    id: 2,
    challenge_name: 'Carrera de Velocidad',
    description:
      'Completa 10 sprints de 100 metros en el menor tiempo posible.',
    challenge_type: 'Run',
    start_date: new Date('2023-09-01'),
    final_date: new Date('2023-09-30'),
  },
  // Desafíos de tipo 'Ride'
  {
    id: 3,
    challenge_name: 'Tour Ciclista',
    description: 'Recorre 100 km en bicicleta por caminos rurales.',
    challenge_type: 'Ride',
    start_date: new Date('2023-08-01'),
    final_date: new Date('2023-08-31'),
  },
  {
    id: 4,
    challenge_name: 'Ascenso Montañoso',
    description: 'Asciende un total de 2000 metros en bicicleta de montaña.',
    challenge_type: 'Ride',
    start_date: new Date('2023-10-01'),
    final_date: new Date('2023-10-31'),
  },
  // Desafíos de tipo 'Swim'
  {
    id: 5,
    challenge_name: 'Travesía Acuática',
    description: 'Nada un total de 5 km en aguas abiertas.',
    challenge_type: 'Swim',
    start_date: new Date('2023-06-01'),
    final_date: new Date('2023-06-30'),
  },
  {
    id: 6,
    challenge_name: 'Maratón de Natación',
    description: 'Completa una distancia de natación de 10 km en piscina.',
    challenge_type: 'Swim',
    start_date: new Date('2023-11-01'),
    final_date: new Date('2023-11-30'),
  },
  // Desafíos de tipo 'Walk'
  {
    id: 7,
    challenge_name: 'Caminata por el Parque',
    description: 'Disfruta de una caminata de 5 km por tu parque local.',
    challenge_type: 'Walk',
    start_date: new Date('2023-07-15'),
    final_date: new Date('2023-08-15'),
  },
  {
    id: 8,
    challenge_name: 'Exploración Urbana',
    description: 'Camine un total de 20 km por las calles de tu ciudad.',
    challenge_type: 'Walk',
    start_date: new Date('2023-09-16'),
    final_date: new Date('2023-10-16'),
  },
  // Desafíos de tipo 'Hike'
  {
    id: 9,
    challenge_name: 'Sendero de Montaña',
    description:
      'Completa una ruta de senderismo con un ascenso total de 1500 metros.',
    challenge_type: 'Hike',
    start_date: new Date('2023-08-01'),
    final_date: new Date('2023-08-31'),
  },
  {
    id: 10,
    challenge_name: 'Aventura de Altura',
    description: 'Realiza una caminata de 25 km por senderos de alta montaña.',
    challenge_type: 'Hike',
    start_date: new Date('2023-12-01'),
    final_date: new Date('2023-12-31'),
  },
  // Desafíos de tipo 'Workout'
  {
    id: 11,
    challenge_name: 'Reto de Fuerza',
    description:
      'Completa un entrenamiento de fuerza con 50 repeticiones de cada ejercicio.',
    challenge_type: 'Workout',
    start_date: new Date('2023-07-01'),
    final_date: new Date('2023-07-31'),
  },
  {
    id: 12,
    challenge_name: 'Desafío de Flexibilidad',
    description: 'Practica una rutina de estiramiento diaria durante 30 días.',
    challenge_type: 'Workout',
    start_date: new Date('2023-09-01'),
    final_date: new Date('2023-09-30'),
  },
  // Añadir más challenges según sea necesario
];
