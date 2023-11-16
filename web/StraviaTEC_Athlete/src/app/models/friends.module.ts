// Definiendo la interfaz Friend
export interface Friend {
  nombre: string;
  firstName: string;
  secondName: string;
  apellido1: string;
  apellido2: string;
  residencia: {
    provincia: string;
    pais: string;
  };
  activities: {
    rideBikes: number;
    runs: number;
  };
}

// Creando un amigo de ejemplo
export const friend: Friend = {
  nombre: 'Juan Carlos',
  firstName: 'Juan',
  secondName: 'Carlos',
  apellido1: 'González',
  apellido2: 'Fernández',
  residencia: {
    provincia: 'Madrid',
    pais: 'España',
  },
  activities: {
    rideBikes: 50,
    runs: 20, // Aquí faltaba una llave de cierre
  },
};

// Creando una lista de amigos de ejemplo
export const friendsList: Friend[] = [
  {
    nombre: 'Ana Torres',
    firstName: 'Ana',
    secondName: '',
    apellido1: 'Torres',
    apellido2: 'García',
    residencia: {
      provincia: 'Valencia',
      pais: 'España',
    },
    activities: {
      rideBikes: 20,
      runs: 25,
    },
  },
  {
    nombre: 'Javier Gómez',
    firstName: 'Javier',
    secondName: '',
    apellido1: 'Gómez',
    apellido2: 'Lorenzo',
    residencia: {
      provincia: 'Madrid',
      pais: 'España',
    },
    activities: {
      rideBikes: 15,
      runs: 35,
    },
  },
  {
    nombre: 'Sofía Navarro',
    firstName: 'Sofía',
    secondName: '',
    apellido1: 'Navarro',
    apellido2: 'Molina',
    residencia: {
      provincia: 'Málaga',
      pais: 'España',
    },
    activities: {
      rideBikes: 40,
      runs: 45,
    },
  },
  {
    nombre: 'David Ruiz',
    firstName: 'David',
    secondName: '',
    apellido1: 'Ruiz',
    apellido2: 'Moreno',
    residencia: {
      provincia: 'Granada',
      pais: 'España',
    },
    activities: {
      rideBikes: 35,
      runs: 20,
    },
  },
  {
    nombre: 'Lucía Hernández',
    firstName: 'Lucía',
    secondName: '',
    apellido1: 'Hernández',
    apellido2: 'Santos',
    residencia: {
      provincia: 'Zaragoza',
      pais: 'España',
    },
    activities: {
      rideBikes: 50,
      runs: 50,
    },
  },
  {
    nombre: 'Daniel Jiménez',
    firstName: 'Daniel',
    secondName: '',
    apellido1: 'Jiménez',
    apellido2: 'Gutiérrez',
    residencia: {
      provincia: 'Bilbao',
      pais: 'España',
    },
    activities: {
      rideBikes: 25,
      runs: 30,
    },
  },
  {
    nombre: 'Carmen Rodríguez',
    firstName: 'Carmen',
    secondName: '',
    apellido1: 'Rodríguez',
    apellido2: 'Díaz',
    residencia: {
      provincia: 'Santander',
      pais: 'España',
    },
    activities: {
      rideBikes: 45,
      runs: 25,
    },
  },
  {
    nombre: 'Francisco Martínez',
    firstName: 'Francisco',
    secondName: '',
    apellido1: 'Martínez',
    apellido2: 'Vázquez',
    residencia: {
      provincia: 'A Coruña',
      pais: 'España',
    },
    activities: {
      rideBikes: 10,
      runs: 40,
    },
  },
  {
    nombre: 'Elena Álvarez',
    firstName: 'Elena',
    secondName: '',
    apellido1: 'Álvarez',
    apellido2: 'Herrero',
    residencia: {
      provincia: 'Oviedo',
      pais: 'España',
    },
    activities: {
      rideBikes: 55,
      runs: 35,
    },
  },
  {
    nombre: 'Miguel Ángel Domínguez',
    firstName: 'Miguel Ángel',
    secondName: '',
    apellido1: 'Domínguez',
    apellido2: 'Gil',
    residencia: {
      provincia: 'Valladolid',
      pais: 'España',
    },
    activities: {
      rideBikes: 20,
      runs: 20,
    },
  },
  {
    nombre: 'Patricia Morales',
    firstName: 'Patricia',
    secondName: '',
    apellido1: 'Morales',
    apellido2: 'Ortega',
    residencia: {
      provincia: 'Girona',
      pais: 'España',
    },
    activities: {
      rideBikes: 35,
      runs: 15,
    },
  },
  {
    nombre: 'Raúl Fernández',
    firstName: 'Raúl',
    secondName: '',
    apellido1: 'Fernández',
    apellido2: 'Vicente',
    residencia: {
      provincia: 'León',
      pais: 'España',
    },
    activities: {
      rideBikes: 22,
      runs: 48,
    },
  },
  {
    nombre: 'Beatriz Martín',
    firstName: 'Beatriz',
    secondName: '',
    apellido1: 'Martín',
    apellido2: 'Romero',
    residencia: {
      provincia: 'Tarragona',
      pais: 'España',
    },
    activities: {
      rideBikes: 60,
      runs: 30,
    },
  },
  {
    nombre: 'Sergio Sánchez',
    firstName: 'Sergio',
    secondName: '',
    apellido1: 'Sánchez',
    apellido2: 'Bravo',
    residencia: {
      provincia: 'Cádiz',
      pais: 'España',
    },
    activities: {
      rideBikes: 10,
      runs: 50,
    },
  },
  {
    nombre: 'Laura García',
    firstName: 'Laura',
    secondName: '',
    apellido1: 'García',
    apellido2: 'Iglesias',
    residencia: {
      provincia: 'Toledo',
      pais: 'España',
    },
    activities: {
      rideBikes: 45,
      runs: 22,
    },
  },
];
