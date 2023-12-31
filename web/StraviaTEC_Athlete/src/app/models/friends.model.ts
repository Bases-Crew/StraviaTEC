// Definiendo la interfaz Friend
export interface Friend {
  aemail: string;
  nombre: string;
  firstname: string;
  secondname: string;
  apellido1: string;
  apellido2: string;
  pais: string;
  challenges: number;
  runs: number;
  following: boolean;
}

// Creando un amigo de ejemplo
export const friend: Friend = {
  aemail: 'juan@gmail.com',
  nombre: 'Juan Carlos',
  firstname: 'Juan',
  secondname: 'Carlos',
  apellido1: 'González',
  apellido2: 'Fernández',
  pais: 'España',
  challenges: 50,
  runs: 20,
  following: false,
};

// Creando una lista de amigos de ejemplo
export const friendsList: Friend[] = [
  {
    aemail: 'ana@gmail.com',
    nombre: 'Ana Torres',
    firstname: 'Ana',
    secondname: '',
    apellido1: 'Torres',
    apellido2: 'García',
    pais: 'Estados Unidos',
    challenges: 20,
    runs: 25,
    following: false,
  },
  {
    aemail: 'javier@gmail.com',
    nombre: 'Javier Gómez',
    firstname: 'Javier',
    secondname: '',
    apellido1: 'Gómez',
    apellido2: 'Lorenzo',
    pais: 'España',
    challenges: 15,
    runs: 35,
    following: true,
  },
  {
    aemail: 'sophia@gmail.com',
    nombre: 'Sofía Navarro',
    firstname: 'Sofía',
    secondname: '',
    apellido1: 'Navarro',
    apellido2: 'Molina',
    pais: 'España',
    challenges: 40,
    runs: 45,
    following: true,
  },
  {
    aemail: 'david@gmail.com',
    nombre: 'David Ruiz',
    firstname: 'David',
    secondname: '',
    apellido1: 'Ruiz',
    apellido2: 'Moreno',
    pais: 'España',
    challenges: 35,
    runs: 20,
    following: true,
  },
  {
    aemail: 'lucia@gmail.com',
    nombre: 'Lucía Hernández',
    firstname: 'Lucía',
    secondname: '',
    apellido1: 'Hernández',
    apellido2: 'Santos',
    pais: 'España',
    challenges: 50,
    runs: 50,
    following: false,
  },
  {
    aemail: 'daniel@gmail.com',
    nombre: 'Daniel Jiménez',
    firstname: 'Daniel',
    secondname: '',
    apellido1: 'Jiménez',
    apellido2: 'Gutiérrez',
    pais: 'España',
    challenges: 25,
    runs: 30,
    following: false,
  },
  {
    aemail: 'carmen@gmail.com',
    nombre: 'Carmen Rodríguez',
    firstname: 'Carmen',
    secondname: '',
    apellido1: 'Rodríguez',
    apellido2: 'Díaz',
    pais: 'España',
    challenges: 45,
    runs: 25,
    following: false,
  },
  {
    aemail: 'francisco@gmail.com',
    nombre: 'Francisco Martínez',
    firstname: 'Francisco',
    secondname: '',
    apellido1: 'Martínez',
    apellido2: 'Vázquez',
    pais: 'España',
    challenges: 10,
    runs: 40,
    following: false,
  },
  {
    aemail: 'elena@gmail.com',
    nombre: 'Elena Álvarez',
    firstname: 'Elena',
    secondname: '',
    apellido1: 'Álvarez',
    apellido2: 'Herrero',
    pais: 'España',
    challenges: 55,
    runs: 35,
    following: false,
  },
  {
    aemail: 'miguel@gmail.com',
    nombre: 'Miguel Ángel Domínguez',
    firstname: 'Miguel Ángel',
    secondname: '',
    apellido1: 'Domínguez',
    apellido2: 'Gil',
    pais: 'España',
    challenges: 20,
    runs: 20,
    following: false,
  },
  {
    aemail: 'patricia@gmail.com',
    nombre: 'Patricia Morales',
    firstname: 'Patricia',
    secondname: '',
    apellido1: 'Morales',
    apellido2: 'Ortega',
    pais: 'España',
    challenges: 35,
    runs: 15,
    following: false,
  },
  {
    aemail: 'raul@gmail.com',
    nombre: 'Raúl Fernández',
    firstname: 'Raúl',
    secondname: '',
    apellido1: 'Fernández',
    apellido2: 'Vicente',
    pais: 'España',
    challenges: 22,
    runs: 48,
    following: false,
  },
  {
    aemail: 'ana@gmail.com',
    nombre: 'Beatriz Martín',
    firstname: 'Beatriz',
    secondname: '',
    apellido1: 'Martín',
    apellido2: 'Romero',
    pais: 'España',
    challenges: 60,
    runs: 30,
    following: false,
  },
  {
    aemail: 'javier@gmail.com',
    nombre: 'Sergio Sánchez',
    firstname: 'Sergio',
    secondname: '',
    apellido1: 'Sánchez',
    apellido2: 'Bravo',
    pais: 'España',
    challenges: 10,
    runs: 50,
    following: false,
  },
  {
    aemail: 'maria@gmail.com',
    nombre: 'Laura García',
    firstname: 'Laura',
    secondname: '',
    apellido1: 'García',
    apellido2: 'Iglesias',
    pais: 'España',
    challenges: 45,
    runs: 22,
    following: false,
  },
  {
    aemail: 'pedrog@gmail.com',
    nombre: 'Pedro Gonzalez',
    firstname: 'Pedro',
    secondname: 'Pepe',
    apellido1: 'Gonzalez',
    apellido2: 'Rodriguez',
    pais: 'España',
    challenges: 0,
    runs: 0,
    following: false,
  },
];
