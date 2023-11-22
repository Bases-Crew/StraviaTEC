export interface CreateActivity {
  fechaHora: Date;
  duracion: number;
  tipoActividad: string;
  kilometraje: number;
  recorrido: File | null;
  esCompletitud: boolean;
}
