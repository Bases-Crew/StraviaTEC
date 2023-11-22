import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../environment';
import { Challenge } from '../models/challenge.model';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private http: HttpClient) {}

  createChallenge(challenge: Challenge): Observable<any> {
    console.log(challenge);
    return this.http
      .post<any>(`${environment.apiUrlSqlServer}/challenge/new`, challenge)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of({ success: false, message: 'Challenge creation failed' });
        })
      );
  }
  // Fake update race method
  updateChallege(challenge: any) {
    console.log('Updating challenge:', challenge);
    return of({ success: true }); // Simulate successful response
  }

  // Fake delete race method
  deleteChallenge(cname: string) {
    console.log('Deleting challenge with ID:', cname);
    return of({ success: true }); // Simulate successful response
  }

  getSports(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sport`); // replace with actual URL
  }

  getSponsors(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sponsor`); // replace with actual URL
  }

  getGroups(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/group`); // replace with actual URL
  }

  getChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(
      `${environment.apiUrlSqlServer}/challenge/allinfo`
    );
  }
}
