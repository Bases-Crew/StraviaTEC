// services/authentication.service.ts

import { Injectable } from '@angular/core';
import { User, exampleUser, user } from '../models/login.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  // Function to validate login credentials
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      responseType: 'text' as 'json', // Truco para evitar el error de TypeScript
    };
    return this.http.post<any>(
      environment.apiUrlSqlServer + '/athlete/login',
      body,
      options
    );
  }

  getInfoUser(aemail: string): Observable<any> {
    let params = new HttpParams().set('aemail', aemail);
    return this.http.get(environment.apiUrlSqlServer + '/athlete', { params });
  }
}
