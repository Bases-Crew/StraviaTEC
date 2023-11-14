// services/authentication.service.ts

import { Injectable } from '@angular/core';
import { Athlete, exampleAthlete } from '../models/athlete.module';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  // Function to validate login credentials
  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; message?: string }> {
    // Simulate checking credentials
    if (
      email === exampleAthlete.Aemail &&
      password === exampleAthlete.Apassword
    ) {
      // If credentials match, return success
      return of({ success: true });
    } else {
      // If credentials don't match, return error message
      return of({
        success: false,
        message: 'Correo o contraseña incorrectos.',
      });
    }
  }
}
