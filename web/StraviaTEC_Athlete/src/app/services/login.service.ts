// services/authentication.service.ts

import { Injectable } from '@angular/core';
import { User, exampleUser } from '../models/login.module';
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
    if (email === exampleUser.email && password === exampleUser.password) {
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
