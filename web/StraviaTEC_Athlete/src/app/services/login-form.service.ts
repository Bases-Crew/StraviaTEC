// services/authentication.service.ts

import { Injectable } from '@angular/core';
import { User, exampleUser } from '../models/login.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  constructor() {}

  // Function to validate login credentials
  login(
    email: string,
    password: string
  ): Observable<{ success: boolean; message?: string }> {
    // Simulate checking credentials
    if (email === exampleUser.aemail && password === exampleUser.apassword) {
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
