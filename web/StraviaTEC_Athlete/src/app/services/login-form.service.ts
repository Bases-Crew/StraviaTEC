// services/authentication.service.ts

import { Injectable } from '@angular/core';
import { User, exampleUser, user } from '../models/login.model';
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
      user.aemail = exampleUser.aemail;
      user.apassword = exampleUser.apassword;
      user.birth_date = exampleUser.birth_date;
      user.fname = exampleUser.fname;
      user.lname = exampleUser.lname;
      user.lname2 = exampleUser.lname2;
      user.image = exampleUser.image;
      user.countryname = exampleUser.countryname;
      user.flag = exampleUser.flag;
      // If credentials match, return success
      return of({ success: true });
    } else if (email === 'ana@gmail.com' && password === '1234') {
      // If email doesn't match, return error message
      user.aemail = 'ana@gmail.com';
      user.apassword = '1234';
      user.birth_date = '2000-01-01';
      user.fname = 'Ana';
      user.lname = 'Lopez';
      user.lname2 = 'Solano';
      user.image =
        'https://medicine.vumc.org/sites/default/files/persons/4125.jpg';
      user.countryname = 'Estados Unidos';
      user.flag =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/203px-Flag_of_the_United_States.svg.png';

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
