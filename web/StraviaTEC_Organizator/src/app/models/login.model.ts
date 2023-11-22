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
  image?: string;
  cno?: number;
}

export const exampleUser: User = {
  aemail: 'pedrog@gmail.com',
  apassword: '1234',
  fname: 'Pedro',
  mname: 'Pepe',
  lname: 'Gonzalez',
  lname2: 'Gonzalez',
  birth_date: '2000-01-01',
  flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/203px-Bandera_de_Espa%C3%B1a.svg.png',
  countryname: 'España',
  image:
    'https://cdn.britannica.com/41/240741-004-756B41D3/Pedro-Pascal-attends-premiere-The-Last-of-US-January-2023.jpg',
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
  image: '',
};
