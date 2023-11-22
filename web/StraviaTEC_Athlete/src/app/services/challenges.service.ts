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

  getChallenges(aemail: string): Observable<Challenge[]> {
    const params = new HttpParams().set('aemail', aemail);
    return this.http.get<Challenge[]>(
      environment.apiUrlSqlServer + '/challenge/athlete/unaccepted',
      {
        params,
      }
    );
  }
}
