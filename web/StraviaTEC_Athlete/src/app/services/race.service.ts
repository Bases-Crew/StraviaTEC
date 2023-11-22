import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../environment';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  constructor(private http: HttpClient) {}

  createRace(race: Race): Observable<any> {
    console.log(race);
    return this.http
      .post<any>(`${environment.apiUrlSqlServer}/race/new`, race)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of({ success: false, message: 'Race creation failed' });
        })
      );
  }
  // Fake update race method
  updateRace(race: any) {
    console.log('Updating race:', race);
    return of({ success: true });
  }

  // Fake delete race method
  deleteRace(raceName: string) {
    console.log('Deleting race with ID:', raceName);
    return of({ success: true });
  }

  getSports(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sport`);
  }

  getSponsors(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sponsor`);
  }

  getGroups(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/group`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrlSqlServer}/category`);
  }

  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(`${environment.apiUrlSqlServer}/race/allinfo`);
  }
}
