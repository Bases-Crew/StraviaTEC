export interface Activity {
  activityid: number;
  adate: string;
  ahour: string;
  aduration: string;
  millage: number;
  auser: string;
  rid?: number;
  challid?: number;
  sport_name: string;
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
  },
  {
    activityid: 2,
    adate: '2023-10-01',
    ahour: '10:00',
    aduration: '1:00',
    millage: 45,
    auser: 'adri@gmail.com',
    sport_name: 'Kayak',
  },
];
