export interface Race {
  raceName: string;
  price: number;
  date: string;
  route?: string; // Previously rroute
  privacy: number; // Assuming this maps to pid
  sportName: string; // Assuming this maps to sptid
  sponsors: string[];
  categories: string[]; // Assuming this maps to sports
  bankAccounts: number[];
  groups: string[];
}
