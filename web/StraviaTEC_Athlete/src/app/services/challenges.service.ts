// challenges.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenge, challengesList } from 'src/app/models/challenges.model'; // Cambia 'challenges.module' por 'challenges.model'

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private challenges: Challenge[] = challengesList; // Usa challengesList aquí

  constructor() {}

  getChallenges(): Observable<Challenge[]> {
    return of(this.challenges);
  }
}
