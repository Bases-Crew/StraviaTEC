import { Injectable } from '@angular/core';
import { Activity } from '../models/show-activities.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comments, COMMENTS } from '../models/comments.model';
import { Observable, of } from 'rxjs';
import { environment } from '../environment';

declare var omnivore: any;
declare var L: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom: number = 8;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  /**
   * The constructor function initializes a private http property of type HttpClient.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a dependency injection that allows you to make HTTP requests in your code. It provides methods for making GET, POST, PUT, DELETE, and other types of HTTP requests to a server.
   */
  constructor(private http: HttpClient) {}

  plotActivity(route: string) {
    // var myStyle = {
    //   color: '#3949AB',
    //   weight: 3,
    //   opacity: 0.95,
    // };

    var map = L.map('map').setView(defaultCoords, defaultZoom);

    map.maxZoom = 100;

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/carlos12001/clp3y534c00zt01pe7kox24vy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2FybG9zMTIwMDEiLCJhIjoiY2xwM3dtdXcwMHJleDJrbWkxbzk5NWJnYSJ9.5kh6vbE31lySQV6MJ6wGUg',
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
      }
    ).addTo(map);

    var customLayer = L.geoJson(null, {
      style: 'mapbox://styles/mapbox/streets-v12',
    });

    var gpxLayer = omnivore
      .gpx(route, null, customLayer)
      .on('ready', function () {
        map.fitBounds(gpxLayer.getBounds());
      })
      .addTo(map);
  }

  /**
   * Retrieves the activity comments from the server.
   *
   * @return {Observable<Comments[]>} An observable that emits an array of comments.
   */
  getActivityComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(environment.apiURLMongoDB + '/comment');
  }

  /**
   * Sends a comment from a user.
   *
   * @param {string} auser - The username of the user sending the comment.
   * @param {string} content - The content of the comment.
   * @param {number} actid - The ID of the activity associated with the comment.
   * @return {Observable<any>} An observable that emits the response from the server.
   */
  postComment(auser: string, content: string, actid: number): Observable<any> {
    const body = { auser: auser, actid: actid, content: content };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<any>(
      environment.apiURLMongoDB + '/comment',
      body,
      options
    );
  }
}
