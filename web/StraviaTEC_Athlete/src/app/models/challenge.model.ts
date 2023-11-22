export interface Challenge {
  cname: string;
  ctype: string;
  mileage: number;
  startDate: string;
  finalDate: string; // Previously rroute
  pid: number; // Assuming this maps to pid
  sportName: string; // Assuming this maps to sptid
  patrocinadores: string[];
  grupos: string[];
}
