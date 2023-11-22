import { Injectable } from '@angular/core';
import { Report, raceEventExample } from '../models/profiles.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  getAllRaces(): Report[] {
    return raceEventExample.races;
  }
}
