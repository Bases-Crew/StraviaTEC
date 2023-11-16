import { Injectable } from '@angular/core';
import { Profile, profilesList } from '../models/tril.model';

@Injectable({
  providedIn: 'root',
})
export class TrilService {
  constructor() {}

  getProfiles(): Profile[] {
    return profilesList;
  }

  getProfileById(id: number): Profile | null {
    return profilesList.find((profile) => profile.id === id) || null;
  }
}
