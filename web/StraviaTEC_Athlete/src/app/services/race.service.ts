import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  constructor(private http: HttpClient) {}

  createRace(formData: FormData): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlSqlServer}/race/create`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of({ success: false, message: 'Race creation failed' });
        })
      );
  }

  getSports(): Observable<any[]> {
    // Fake data
    const sports = [
      { SportName: 'Caminata' },
      { SportName: 'Ciclismo' },
      // ... more sports
    ];
    return of(sports);
  }

  getSponsors(): Observable<any[]> {
    // Fake data
    const sponsors = [
      { name: 'Sponsor 1' },
      { name: 'Sponsor 2' },
      // ... more sponsors
    ];
    return of(sponsors);
  }

  getGroups(): Observable<any[]> {
    // Fake data
    const groups = [
      { name: 'Group 1' },
      { name: 'Group 2' },
      // ... more groups
    ];
    return of(groups);
  }
  /*
  getSports(): Observable<any> {
    return this.http.get<any>('/api/sports'); // replace with actual URL
  }

  getSponsors(): Observable<any> {
    return this.http.get<any>('/api/sponsors'); // replace with actual URL
  }

  getGroups(): Observable<any> {
    return this.http.get<any>('/api/groups'); // replace with actual URL
  }
*/
  // ... other service methods
}
