export interface Comments {
  auser: string;
  actid: number;
  content: string;
}

export const COMMENTS: Comments[] = [
  {
    auser: 'david@example.com',
    actid: 1,
    content: 'Wow, eso es mucha distancia.',
  },
  {
    auser: 'sophia@gmailcom',
    actid: 1,
    content: 'Vamos tu puedes!',
  },
  {
    auser: 'javier@gmailcom',
    actid: 1,
    content: 'Que bueno!',
  },
  {
    auser: 'maria@gmail.com',
    actid: 2,
    content: 'Creo que hare esa ruta.',
  },
  {
    auser: 'javier@gmailcom',
    actid: 2,
    content: 'Que bueno!',
  },
];
