import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../environment';
import { Challenge } from '../models/challenge.model';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(private http: HttpClient) {}

  /**
   * Creates a new challenge.
   *
   * @param {Challenge} challenge - The challenge object to be created.
   * @returns {Observable<any>} - An observable that emits the response of the HTTP post request.
   */
  createChallenge(challenge: Challenge): Observable<any> {
    console.log(challenge);
    return this.http
      .post<any>(`${environment.apiUrlSqlServer}/challenge/new`, challenge)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of({ success: false, message: 'Challenge creation failed' });
        })
      );
  }

  /**
   * Updates an existing challenge.
   *
   * @param {Challenge} challenge - The challenge object to be updated.
   * @returns {Observable<any>} - An observable that emits the response of the HTTP put request.
   */
  updateChallege(challenge: any) {
    console.log('Updating challenge:', challenge);
    return of({ success: true }); // Simulate successful response
  }

  /**
   * Deletes a challenge.
   *
   * @param {string} cname - The name of the challenge to be deleted.
   * @returns {Observable<any>} - An observable that emits the response of the HTTP delete request.
   */
  deleteChallenge(cname: string) {
    console.log('Deleting challenge with ID:', cname);
    return of({ success: true }); // Simulate successful response
  }

  /**
   * Retrieves a list of sports from the server.
   *
   * @return {Observable<any>} An observable that emits the response from the server.
   */
  getSports(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sport`); // replace with actual URL
  }

  /**
   * Retrieves the sponsors by making an HTTP GET request to the specified API endpoint.
   *
   * @return {Observable<any>} An Observable that emits the response from the API endpoint.
   */
  getSponsors(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/sponsor`); // replace with actual URL
  }

  /**
   * Retrieves the groups using an HTTP GET request.
   *
   * @return {Observable<any>} An observable that emits the response data.
   */
  getGroups(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrlSqlServer}/group`); // replace with actual URL
  }

  /**
   * Retrieves all challenges.
   *
   * @return {Observable<Challenge[]>} An observable of an array of Challenge objects.
   */
  getChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(
      `${environment.apiUrlSqlServer}/challenge/allinfo`
    );
  }
}
