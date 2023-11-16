//
export interface Athlete {
  Fname?: string;
  Mname?: string;
  Lname?: string;
  Lname2?: string;
  Aemail: string;
  Apassword: string;
  Photo?: string;
  Cno?: number;
  Birth_date?: string;
}

export const exampleAthlete: Athlete = {
  Aemail: 'pedrog@gmail.com',
  Apassword: '1234',
};
