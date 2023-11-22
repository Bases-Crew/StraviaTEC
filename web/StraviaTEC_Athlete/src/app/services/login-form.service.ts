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

  /**
   * Logs in a user with the provided email and password.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @return {Observable<any>} - An observable that emits the response from the server.
   */
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

  /**
   * Retrieves information about a user using their email.
   *
   * @param {string} aemail - The email of the user.
   * @return {Observable<any>} An observable that emits the user information.
   */
  getInfoUser(aemail: string): Observable<any> {
    let params = new HttpParams().set('aemail', aemail);
    return this.http.get(environment.apiUrlSqlServer + '/athlete', { params });
  }
}
