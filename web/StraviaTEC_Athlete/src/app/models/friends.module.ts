// Definiendo la interfaz Friend
export interface Friend {
  nombre: string;
  firstname: string;
  secondname: string;
  apellido1: string;
  apellido2: string;
  residencia: {
    provincia: string;
    pais: string;
  };
  activities: {
    ridebikes: number;
    runs: number;
  };
}

// Creando un amigo de ejemplo
export const friend: Friend = {
  nombre: 'Juan Carlos',
  firstname: 'Juan',
  secondname: 'Carlos',
  apellido1: 'González',
  apellido2: 'Fernández',
  residencia: {
    provincia: 'Madrid',
    pais: 'España',
  },
  activities: {
    ridebikes: 50,
    runs: 20, // Aquí faltaba una llave de cierre
  },
};

// Creando una lista de amigos de ejemplo
export const friendsList: Friend[] = [
  {
    nombre: 'Ana Torres',
    firstname: 'Ana',
    secondname: '',
    apellido1: 'Torres',
    apellido2: 'García',
    residencia: {
      provincia: 'Valencia',
      pais: 'España',
    },
    activities: {
      ridebikes: 20,
      runs: 25,
    },
  },
  {
    nombre: 'Javier Gómez',
    firstname: 'Javier',
    secondname: '',
    apellido1: 'Gómez',
    apellido2: 'Lorenzo',
    residencia: {
      provincia: 'Madrid',
      pais: 'España',
    },
    activities: {
      ridebikes: 15,
      runs: 35,
    },
  },
  {
    nombre: 'Sofía Navarro',
    firstname: 'Sofía',
    secondname: '',
    apellido1: 'Navarro',
    apellido2: 'Molina',
    residencia: {
      provincia: 'Málaga',
      pais: 'España',
    },
    activities: {
      ridebikes: 40,
      runs: 45,
    },
  },
  {
    nombre: 'David Ruiz',
    firstname: 'David',
    secondname: '',
    apellido1: 'Ruiz',
    apellido2: 'Moreno',
    residencia: {
      provincia: 'Granada',
      pais: 'España',
    },
    activities: {
      ridebikes: 35,
      runs: 20,
    },
  },
  {
    nombre: 'Lucía Hernández',
    firstname: 'Lucía',
    secondname: '',
    apellido1: 'Hernández',
    apellido2: 'Santos',
    residencia: {
      provincia: 'Zaragoza',
      pais: 'España',
    },
    activities: {
      ridebikes: 50,
      runs: 50,
    },
  },
  {
    nombre: 'Daniel Jiménez',
    firstname: 'Daniel',
    secondname: '',
    apellido1: 'Jiménez',
    apellido2: 'Gutiérrez',
    residencia: {
      provincia: 'Bilbao',
      pais: 'España',
    },
    activities: {
      ridebikes: 25,
      runs: 30,
    },
  },
  {
    nombre: 'Carmen Rodríguez',
    firstname: 'Carmen',
    secondname: '',
    apellido1: 'Rodríguez',
    apellido2: 'Díaz',
    residencia: {
      provincia: 'Santander',
      pais: 'España',
    },
    activities: {
      ridebikes: 45,
      runs: 25,
    },
  },
  {
    nombre: 'Francisco Martínez',
    firstname: 'Francisco',
    secondname: '',
    apellido1: 'Martínez',
    apellido2: 'Vázquez',
    residencia: {
      provincia: 'A Coruña',
      pais: 'España',
    },
    activities: {
      ridebikes: 10,
      runs: 40,
    },
  },
  {
    nombre: 'Elena Álvarez',
    firstname: 'Elena',
    secondname: '',
    apellido1: 'Álvarez',
    apellido2: 'Herrero',
    residencia: {
      provincia: 'Oviedo',
      pais: 'España',
    },
    activities: {
      ridebikes: 55,
      runs: 35,
    },
  },
  {
    nombre: 'Miguel Ángel Domínguez',
    firstname: 'Miguel Ángel',
    secondname: '',
    apellido1: 'Domínguez',
    apellido2: 'Gil',
    residencia: {
      provincia: 'Valladolid',
      pais: 'España',
    },
    activities: {
      ridebikes: 20,
      runs: 20,
    },
  },
  {
    nombre: 'Patricia Morales',
    firstname: 'Patricia',
    secondname: '',
    apellido1: 'Morales',
    apellido2: 'Ortega',
    residencia: {
      provincia: 'Girona',
      pais: 'España',
    },
    activities: {
      ridebikes: 35,
      runs: 15,
    },
  },
  {
    nombre: 'Raúl Fernández',
    firstname: 'Raúl',
    secondname: '',
    apellido1: 'Fernández',
    apellido2: 'Vicente',
    residencia: {
      provincia: 'León',
      pais: 'España',
    },
    activities: {
      ridebikes: 22,
      runs: 48,
    },
  },
  {
    nombre: 'Beatriz Martín',
    firstname: 'Beatriz',
    secondname: '',
    apellido1: 'Martín',
    apellido2: 'Romero',
    residencia: {
      provincia: 'Tarragona',
      pais: 'España',
    },
    activities: {
      ridebikes: 60,
      runs: 30,
    },
  },
  {
    nombre: 'Sergio Sánchez',
    firstname: 'Sergio',
    secondname: '',
    apellido1: 'Sánchez',
    apellido2: 'Bravo',
    residencia: {
      provincia: 'Cádiz',
      pais: 'España',
    },
    activities: {
      ridebikes: 10,
      runs: 50,
    },
  },
  {
    nombre: 'Laura García',
    firstname: 'Laura',
    secondname: '',
    apellido1: 'García',
    apellido2: 'Iglesias',
    residencia: {
      provincia: 'Toledo',
      pais: 'España',
    },
    activities: {
      ridebikes: 45,
      runs: 22,
    },
  },
];
