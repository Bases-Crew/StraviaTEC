import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Inscription,
  inscriptionExamples,
} from 'src/app/models/inscription.model';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  constructor() {}

  getRaces(): Observable<Inscription[]> {
    const racesWithId = inscriptionExamples.map((race, index) => ({
      ...race,
      id: index + 1, // Asigna un ID a cada carrera
    }));
    return of(racesWithId); // Devolver las carreras con ID
  }
}
