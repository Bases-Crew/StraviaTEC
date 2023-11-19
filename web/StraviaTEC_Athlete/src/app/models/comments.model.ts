export interface Comments {
  aemail: string;
  content: string;
}

export interface ActivityComments {
  activityid: number;
  comments: Comments[];
}

export const comments1Example: ActivityComments = {
  activityid: 1,
  comments: [
    {
      aemail: 'david@example.com',
      content: 'Wow, eso es mucha distancia.',
    },
    {
      aemail: 'sophia@gmailcom',
      content: 'Vamos tu puedes!',
    },
    {
      aemail: 'javier@gmailcom',
      content: 'Que bueno!',
    },
  ],
};

export const comments2Example: ActivityComments = {
  activityid: 2,
  comments: [
    {
      aemail: 'maria@gmail.com',
      content: 'Creo que hare esa ruta.',
    },
    {
      aemail: 'javier@gmailcom',
      content: 'Que bueno!',
    },
  ],
};
