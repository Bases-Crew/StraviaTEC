// challenges.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenge } from 'src/app/models/challenges.model'; // Cambia 'challenges.module' por 'challenges.model'
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private http: HttpClient) {}

  getChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(
      environment.apiUrlSqlServer + '/challenge/available'
    );
  }
}
