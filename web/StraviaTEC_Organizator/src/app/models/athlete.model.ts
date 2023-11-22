//
export interface Athlete {
  fname?: string;
  mname?: string;
  lname1?: string;
  lname2?: string;
  aemail: string;
  apassword: string;
  photo?: string;
  birth_date?: string;
  flag?: string;
  countryname?: string;
}

export const exampleLogin: Athlete = {
  aemail: 'pedrog@gmail.com',
  apassword: '1234',
};

export const exampleAthlete: Athlete = {
  aemail: 'pedrog@gmail.com',
  apassword: '1234',
  fname: 'Pedro',
  lname1: 'Gonzalez',
  lname2: 'Gonzalez',
  birth_date: '2000-01-01',
  flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/203px-Bandera_de_Espa%C3%B1a.svg.png',
  countryname: 'España',
};

export const athlete: Athlete = {
  aemail: '',
  apassword: '',
  fname: '',
  mname: '',
  lname1: '',
  lname2: '',
  birth_date: '',
  flag: '',
  countryname: '',
};
