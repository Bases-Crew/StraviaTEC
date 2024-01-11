import { Injectable } from '@angular/core';
import { Activity } from '../models/show-activities.model';
import { HttpClient } from '@angular/common/http';
import {
  Comments,
  comments1Example,
  comments2Example,
} from '../models/comments.model';
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
  url: string = environment.apiUrlSqlServer;
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
      'https://api.mapbox.com/styles/v1/carlos12001/clp3y534c00zt01pe7kox24vy/tiles/256/{z}/{x}/{y}@2x?access_token=',
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

  getActivityComments(id: number): Observable<Comments[]> {
    // return this.http.get<Comments[]>(this.url + 'api/character');
    if (id == 1) {
      return of(comments1Example.comments);
    } else if (id == 2) {
      return of(comments2Example.comments);
    } else {
      return of([]);
    }
  }

  postComment(aemail: string, content: string): Observable<Comments[]> {
    return of([{ aemail, content }]);
  }
}
