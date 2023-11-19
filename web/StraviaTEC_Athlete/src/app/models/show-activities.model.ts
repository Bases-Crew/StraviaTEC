export interface Activity {
  activityid: number;
  adate: string;
  ahour: string;
  aduration: string;
  millage: number;
  auser: string;
  rid?: number;
  challid?: number;
  sport_name: 'Run' | 'Ride' | 'Swim' | 'Walk' | 'Hike' | 'Kayak';
  route?: string;
}

export const activitiesExamples: Activity[] = [
  {
    activityid: 1,
    adate: '2023-07-01',
    ahour: '10:00',
    aduration: '1:00',
    millage: 10,
    auser: 'ana@gmail.com',
    sport_name: 'Run',
    route: '../../assets/gpx/1.gpx',
  },
  {
    activityid: 2,
    adate: '2023-10-01',
    ahour: '10:00',
    aduration: '1:00',
    millage: 45,
    auser: 'adri@gmail.com',
    sport_name: 'Walk',
    route: '../../assets/gpx/2.gpx',
  },
  {
    activityid: 3,
    adate: '2023-11-01',
    ahour: '20:00',
    aduration: '2:00',
    millage: 20,
    auser: 'jose@gmail.com',
    sport_name: 'Ride',
    route: '../../assets/gpx/3.gpx',
  },
  {
    activityid: 4,
    adate: '2023-12-01',
    ahour: '15:00',
    aduration: '3:00',
    millage: 60,
    auser: 'maria@gmail.com',
    sport_name: 'Hike',
    route: '../../assets/gpx/4.gpx',
  },
];

export const activitiesExamples2: Activity[] = [
  {
    activityid: 2,
    adate: '2023-10-01',
    ahour: '10:00',
    aduration: '1:00',
    millage: 45,
    auser: 'adri@gmail.com',
    sport_name: 'Walk',
    route: '../../assets/gpx/2.gpx',
  },
  {
    activityid: 1000,
    adate: '2023-12-01',
    ahour: '15:00',
    aduration: '3:00',
    millage: 60,
    auser: 'pedro@gmail.com',
    sport_name: 'Ride',
    route: '../../assets/gpx/1000.gpx',
  },
];
