import { Injectable } from '@angular/core';
import { Profile, profilesList } from '../models/tril.model';

@Injectable({
  providedIn: 'root',
})
export class TrilService {
  constructor() {}

  /**
   * Retrieve the profiles.
   *
   * @return {Profile[]} The list of profiles.
   */
  getProfiles(): Profile[] {
    return profilesList;
  }

  /**
   * Retrieves a profile by its ID.
   *
   * @param {number} id - The ID of the profile.
   * @return {Profile | null} The profile with the specified ID, or null if no profile is found.
   */
  getProfileById(id: number): Profile | null {
    return profilesList.find((profile) => profile.id === id) || null;
  }
}
