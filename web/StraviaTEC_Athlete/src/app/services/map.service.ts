import { Injectable } from '@angular/core';
import { Activity } from '../models/show-activities.model';

declare var omnivore: any;
declare var L: any;

const defaultCoords: number[] = [40, -80];
const defaultZoom: number = 8;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

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
}
