export interface Profile {
  id: number;
  profile_name: string;
  description: string;
  activity_type: string;
  start_date: Date;
  end_date: Date;
  completion?: number;
}

export const profilesList: Profile[] = [
  // Perfiles de tipo 'Run'
  {
    id: 1,
    profile_name: 'Maratón de la Ciudad',
    description:
      'Corre un total de 42.2 km (26.2 millas) a través de la ciudad.',
    activity_type: 'Run',
    start_date: new Date('2023-07-01'),
    end_date: new Date('2023-07-31'),
  },
  // ... otros perfiles ...
  {
    id: 12,
    profile_name: 'Desafío de Flexibilidad',

    description: 'Practica una rutina de estiramiento diaria durante 30 días.',
    activity_type: 'Workout',
    start_date: new Date('2023-09-01'),
    end_date: new Date('2023-09-30'),
    completion: 70,
  },
  // Añade el campo 'person_name' a todos los perfiles restantes
];
