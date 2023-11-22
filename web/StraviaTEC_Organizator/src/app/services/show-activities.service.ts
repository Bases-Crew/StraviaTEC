import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environment';
import {
  Activity,
  activitiesExamples,
  activitiesExamples2,
} from '../models/show-activities.model';

@Injectable({
  providedIn: 'root',
})
export class ShowActivitiesService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of activities for a given email address.
   *
   * @param {string} aemeail - The email address of the user.
   * @return {Observable<Activity[]>} An observable of an array of activities.
   */
  getActivities(aemeail: string): Observable<Activity[]> {
    // return this.http.get<Activity[]>(
    //   `${environment.apiUrlSqlServer}/activities`
    // );

    if (aemeail == 'pedrogr@gmail.com') {
      return of(activitiesExamples);
    } else if (aemeail == 'ana@gmail.com') {
      return of(activitiesExamples2);
    }
    return of(activitiesExamples);
  }
}
