import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userEmail: string | null = null;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * Sets the email for the user.
   *
   * @param {string} email - The email to set for the user.
   */
  setEmail(email: string) {
    this.userEmail = email;
  }

  /**
   * Retrieves the email associated with the user.
   *
   * @return {string | null} The email address of the user, or null if not available.
   */
  getEmail(): string | null {
    if (!this.userEmail) {
      return 'pedrog@gmail.com';
    }
    return this.userEmail;
  }

  /**
   * Retrieves country data from the server.
   *
   * @return {Observable<any>} An observable that emits country data.
   */
  getCountry(): Observable<any> {
    return this.http.get<any>(environment.apiUrlSqlServer + '/country');
  }
}
