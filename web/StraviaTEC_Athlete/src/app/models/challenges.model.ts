// challenge.model.ts
export interface Challenge {
  id: number;
  challenge_name: string;
  challenge_type: string;
  SportName: 'Run' | 'Ride' | 'Swim' | 'Walk' | 'Hike' | 'Kayak';
  Mileage: number;
  start_date: Date;
  final_date: Date;
}

export const challengesList: Challenge[] = [
  // Desafíos de tipo 'Run'
  {
    id: 1,
    challenge_name: 'Maratón de la Ciudad',
    challenge_type:
      'Corre un total de 42.2 km (26.2 millas) a través de la ciudad.',
    SportName: 'Run',
    start_date: new Date('2023-07-01'),
    final_date: new Date('2023-07-31'),
    Mileage: 42,
  },
  {
    id: 2,
    challenge_name: 'Carrera de Velocidad',
    challenge_type:
      'Completa 10 sprints de 100 metros en el menor tiempo posible.',
    SportName: 'Run',
    start_date: new Date('2023-09-01'),
    final_date: new Date('2023-09-30'),
    Mileage: 4,
  },
  // Desafíos de tipo 'Ride'
  {
    id: 3,
    challenge_name: 'Tour Ciclista',
    challenge_type: 'Recorre 100 km en bicicleta por caminos rurales.',
    SportName: 'Ride',
    start_date: new Date('2023-08-01'),
    final_date: new Date('2023-08-31'),
    Mileage: 32,
  },
  {
    id: 4,
    challenge_name: 'Ascenso Montañoso',
    challenge_type: 'Asciende un total de 2000 metros en bicicleta de montaña.',
    SportName: 'Ride',
    start_date: new Date('2023-10-01'),
    final_date: new Date('2023-10-31'),
    Mileage: 20,
  },
  // Desafíos de tipo 'Swim'
  {
    id: 5,
    challenge_name: 'Travesía Acuática',
    challenge_type: 'Nada un total de 5 km en aguas abiertas.',
    SportName: 'Swim',
    start_date: new Date('2023-06-01'),
    final_date: new Date('2023-06-30'),
    Mileage: 5,
  },
  {
    id: 6,
    challenge_name: 'Maratón de Natación',
    challenge_type: 'Completa una distancia de natación de 10 km en piscina.',
    SportName: 'Swim',
    start_date: new Date('2023-11-01'),
    final_date: new Date('2023-11-30'),
    Mileage: 10,
  },
  // Desafíos de tipo 'Walk'
  {
    id: 7,
    challenge_name: 'Caminata por el Parque',
    challenge_type: 'Disfruta de una caminata de 5 km por tu parque local.',
    SportName: 'Walk',
    start_date: new Date('2023-07-15'),
    final_date: new Date('2023-08-15'),
    Mileage: 5,
  },
  {
    id: 8,
    challenge_name: 'Exploración Urbana',
    challenge_type: 'Camine un total de 20 km por las calles de tu ciudad.',
    SportName: 'Walk',
    start_date: new Date('2023-09-16'),
    final_date: new Date('2023-10-16'),
    Mileage: 64,
  },
  // Desafíos de tipo 'Hike'
  {
    id: 9,
    challenge_name: 'Sendero de Montaña',
    challenge_type:
      'Completa una ruta de senderismo con un ascenso total de 1500 metros.',
    SportName: 'Hike',
    start_date: new Date('2023-08-01'),
    final_date: new Date('2023-08-31'),
    Mileage: 15,
  },
  {
    id: 10,
    challenge_name: 'Aventura de Altura',
    challenge_type:
      'Realiza una caminata de 25 km por senderos de alta montaña.',
    SportName: 'Hike',
    start_date: new Date('2023-12-01'),
    final_date: new Date('2023-12-31'),
    Mileage: 23,
  },
  // Desafíos de tipo 'Kayak'
  {
    id: 11,
    challenge_name: 'Reto de Fuerza',
    challenge_type:
      'Completa un entrenamiento de fuerza con 50 repeticiones de cada ejercicio.',
    SportName: 'Kayak',
    start_date: new Date('2023-07-01'),
    final_date: new Date('2023-07-31'),
    Mileage: 6,
  },
  {
    id: 12,
    challenge_name: 'Desafío de Flexibilidad',
    challenge_type:
      'Practica una rutina de estiramiento diaria durante 30 días.',
    SportName: 'Kayak',
    start_date: new Date('2023-09-01'),
    final_date: new Date('2023-09-30'),
    Mileage: 9,
  },
  // Añadir más challenges según sea necesario
];
