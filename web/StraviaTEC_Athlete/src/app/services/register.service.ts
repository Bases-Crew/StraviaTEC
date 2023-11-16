import { Injectable } from '@angular/core';
import { Athlete } from '../models/athlete.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  registerUser(user: Athlete): Observable<any> {
    console.log('Simulated registration:', user);
    return of({ success: true });
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
