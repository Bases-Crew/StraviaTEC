import { Injectable } from '@angular/core';
import { Profile, profilesList } from 'src/app/models/profiles.model';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor() {}

  getProfiles(): Profile[] {
    return profilesList;
  }

  getProfileById(id: number): Profile | null {
    return profilesList.find((profile) => profile.id === id) || null;
  }
}
