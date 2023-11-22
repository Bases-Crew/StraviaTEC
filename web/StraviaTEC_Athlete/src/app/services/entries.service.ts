import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves all races.
   *
   * @return {Observable<any>} The observable of the race information.
   */
  getRaces(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/race/allinfo`);
  }

  /**
   * Retrieves emails using the getEmails function.
   *
   * @return {Observable<any>} An observable that emits the emails.
   */
  getEmails(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/athlete/all`);
  }
}
