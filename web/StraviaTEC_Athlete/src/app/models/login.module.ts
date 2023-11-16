//
export interface User {
  aemail: string;
  apassword: string;
  fname: string;
  mname: string | null;
  lname: string;
  lname2: string;
  cno: number;
  birth_date: string;
}

export const exampleUser: User = {
  aemail: 'pedrog@gmail.com',
  apassword: '1234',
  fname: 'Pedro',
  mname: null,
  lname: 'Gonzalez',
  lname2: 'Gonzalez',
  cno: 123456789,
  birth_date: '2000-01-01',
};

export const user: User = {
  aemail: '',
  apassword: '',
  fname: '',
  mname: '',
  lname: '',
  lname2: '',
  cno: 0,
  birth_date: '',
};
