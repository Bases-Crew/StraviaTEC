//
export interface User {
  aemail: string;
  apassword: string;
  fname: string;
  mname: string | null;
  lname: string;
  lname2: string;
  birth_date: string;
  flag: string;
  countryname: string;
}

export const exampleUser: User = {
  aemail: 'pedrog@gmail.com',
  apassword: '1234',
  fname: 'Pedro',
  mname: null,
  lname: 'Gonzalez',
  lname2: 'Gonzalez',
  birth_date: '2000-01-01',
  flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/203px-Bandera_de_Espa%C3%B1a.svg.png',
  countryname: 'España',
};

export const user: User = {
  aemail: '',
  apassword: '',
  fname: '',
  mname: '',
  lname: '',
  lname2: '',
  birth_date: '',
  flag: '',
  countryname: '',
};
