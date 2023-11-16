export interface Group {
  id: number;
  name: string;
  location: string;
  memberCount: number;
  category: string;
  joined: boolean;
  imageUrl: string; // Propiedad para la URL de la imagen
}

export const sampleGroups: Group[] = [
  {
    id: 1,
    name: 'Corredores del Amanecer',
    location: 'San José, Costa Rica',
    memberCount: 546,
    category: 'Running Club',
    joined: false,
    imageUrl:
      'https://dgalywyr863hv.cloudfront.net/pictures/clubs/76016/1513106/5/large.jpg', // URL ficticia de ejemplo
  },
  {
    id: 2,
    name: 'Runners Costa Rica',
    location: 'Heredia, Costa Rica',
    memberCount: 28,
    category: 'Racing Team',
    joined: false,
    imageUrl:
      'https://dgalywyr863hv.cloudfront.net/pictures/clubs/908091/19859333/2/large.jpg', // URL ficticia de ejemplo
  },
  {
    id: 3,
    name: 'Hypoxic Costa Rica',
    location: 'Cartago, Costa Rica',
    memberCount: 56,
    category: 'High-Altitude Training Club',
    joined: false,
    imageUrl:
      'https://dgalywyr863hv.cloudfront.net/pictures/clubs/271175/5998426/3/large.jpg', // URL ficticia de ejemplo
  },
  {
    id: 4,
    name: 'CRPRO Run',
    location: 'Limon, Costa Rica',
    memberCount: 47,
    category: 'Professional Runners Club',
    joined: false,
    imageUrl:
      'https://dgalywyr863hv.cloudfront.net/pictures/clubs/573050/13333508/3/large.jpg', // URL ficticia de ejemplo
  },
];
