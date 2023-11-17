import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environment';
import { Activity, activitiesExamples } from '../models/show-activities.model';

@Injectable({
  providedIn: 'root',
})
export class ShowActivitiesService {
  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    // return this.http.get<Activity[]>(
    //   `${environment.apiUrlSqlServer}/activities`
    // );
    return of(activitiesExamples);
  }
}
