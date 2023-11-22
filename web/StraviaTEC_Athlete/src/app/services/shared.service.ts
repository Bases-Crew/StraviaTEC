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

  setEmail(email: string) {
    this.userEmail = email;
  }

  getEmail(): string | null {
    if (!this.userEmail) {
      return 'pedrog@gmail.com';
    }
    return this.userEmail;
  }

  getCountry(): Observable<any> {
    return this.http.get<any>(environment.apiUrlSqlServer + '/country');
  }
}
