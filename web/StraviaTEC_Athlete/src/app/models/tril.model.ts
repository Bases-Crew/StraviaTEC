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
  {
    id: 1,
    profile_name: 'Campeonato Internacional de Escalada Tiburón',
    description: 'Competencia de escalda de 4.5 km , celebrada en Barcelona.',
    activity_type: 'Hike',
    start_date: new Date('2023-07-01'),
    end_date: new Date('2023-07-23'),
    completion: 53, // Este campo podría referirse al porcentaje de competidores que completaron el evento
  },
  {
    id: 2,
    profile_name: 'Maratón Urbano Internacional',
    description:
      'Maratón de 42.2 km que atraviesa el corazón histórico y los barrios modernos de la ciudad de Nueva York.',
    activity_type: 'Carrera',
    start_date: new Date('2023-07-01'),
    end_date: new Date('2023-07-31'),
  },
  {
    id: 3,
    profile_name: 'Desafío Global de Flexibilidad',
    description:
      'Evento mundial de flexibilidad y agilidad, con participantes realizando rutinas diarias y compartiendo sus progresos en línea.',
    activity_type: 'Fitness',
    start_date: new Date('2023-09-01'),
    end_date: new Date('2023-09-30'),
    completion: 70, // Este campo podría referirse al porcentaje de participantes que alcanzaron sus objetivos personales
  },
];
