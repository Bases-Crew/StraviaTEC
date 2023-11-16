import { Injectable } from '@angular/core';
import { Athlete } from '../models/athlete.module';
import { Country } from '../models/country.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  registerUser(formData: FormData): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrlSqlServer}/athlete/signup`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of({ success: false, message: 'Registration failed' });
        })
      );
  }
  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http
      .get<Country[]>(`${environment.apiUrlSqlServer}/country`)
      .pipe(
        map((countries: Country[]) =>
          countries.map((country) => country.CountryName)
        ),
        catchError((error) => {
          console.error('Error:', error);
          return of([]);
        })
      );
  }

  /*
  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(`${this.apiUrl}/register`, user, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          throw new Error('Algo salió mal. :c');
        })
      );
  }
  */
}
