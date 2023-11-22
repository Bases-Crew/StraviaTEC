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

  /**
   * Creates a new race.
   *
   * @param {Race} race - The race object to be created.
   * @return {Observable<any>} An observable that emits the response from the server.
   */
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

  updateRace(race: any) {
    /**
     * Updates the race.
     *
     * @param {any} race - The race object to be updated.
     * @return {Observable<any>} An observable that emits a success object upon completion.
     */
    console.log('Updating race:', race);
    return of({ success: true });
  }

  deleteRace(raceName: string) {
    /**
     * Deletes a race with the given race name.
     *
     * @param {string} raceName - The name of the race to be deleted.
     * @return {Observable} An Observable that emits an object indicating the success of the deletion.
     */
    console.log('Deleting race with ID:', raceName);
    return of({ success: true });
  }

  /**
   * Retrieves the list of sports from the server.
   *
   * @return {Observable<any>} The HTTP response containing the list of sports.
   */
  getSports(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sport`);
  }

  /**
   * Retrieves a list of sponsors from the server.
   *
   * @return {Observable<any>} An observable that emits the response from the server.
   */
  getSponsors(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sponsor`);
  }

  /**
   * Retrieves the groups using an HTTP GET request.
   *
   * @return {Observable<any>} An observable that emits the response from the API.
   */
  getGroups(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/group`);
  }

  /**
   * Retrieves the categories from the server.
   *
   * @return {Observable<string[]>} An observable that emits an array of strings representing the categories.
   */
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrlSqlServer}/category`);
  }

  /**
   * Retrieves the races data from the server.
   *
   * @return {Observable<Race[]>} The races data as an observable.
   */
  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(`${environment.apiUrlSqlServer}/race/allinfo`);
  }
}
