import { Injectable } from '@angular/core';
import { Report, raceEventExample } from '../models/profiles.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  /**
   * Retrieves the profiles.
   *
   * @return {Report[]} The list of profiles.
   */
  getAllRaces(): Report[] {
    return raceEventExample.races;
  }
}
