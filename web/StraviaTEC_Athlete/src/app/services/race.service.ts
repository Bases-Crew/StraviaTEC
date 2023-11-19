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
    return of({ success: true }); // Simulate successful response
  }

  // Fake delete race method
  deleteRace(raceName: string) {
    console.log('Deleting race with ID:', raceName);
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

  getCategories(): Observable<string[]> {
    // Replace with the actual HTTP request to your API
    return this.http.get<string[]>(`${environment.apiUrlSqlServer}/category`);
  }

  getRaces(): Observable<Race[]> {
    // Fake GPX content as a string
    const fakeGPXContent = `GPX data...`;

    const fakeRaces: Race[] = [
      {
        raceName: 'PedroCarrera',
        price: 10,
        date: '2023-01-01',
        route: fakeGPXContent,
        privacy: 1, // 1 for private
        sportName: 'Cycling',
        sponsors: ['Sponsor A', 'Sponsor B'],
        categories: ['Category 1', 'Category 2'],
        bankAccounts: [123456, 789012],
        groups: ['Group 1', 'Group 2'],
      },
      {
        raceName: 'Antorcha',
        price: 700,
        date: '2023-12-01',
        route: fakeGPXContent,
        privacy: 0, // 0 for public
        sportName: 'Running',
        sponsors: ['Sponsor C'],
        categories: ['Category 3'],
        bankAccounts: [345678],
        groups: [],
      },
      // ... other races ...
    ];

    return of(fakeRaces);
  }

  // ... other service methods
}
