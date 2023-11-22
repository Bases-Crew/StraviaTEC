import { Injectable } from '@angular/core';
import { Profile, profilesList } from 'src/app/models/profiles.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor() {}

  /**
   * Retrieves the profiles.
   *
   * @return {Profile[]} The list of profiles.
   */
  getProfiles(): Profile[] {
    return profilesList;
  }

  /**
   * Retrieves a profile by its ID.
   *
   * @param {number} id - The ID of the profile to retrieve.
   * @return {Profile | null} The profile with the specified ID, or null if it doesn't exist.
   */
  getProfileById(id: number): Profile | null {
    return profilesList.find((profile) => profile.id === id) || null;
  }
}
