// login-form.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { LoginFormService as LoginFormService } from '../../services/login-form.service'; // Update the path as necessary
import { Router } from '@angular/router';
import { exampleUser, user } from 'src/app/models/login.model';
import { SharedService } from '../../services/shared.service';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-login-org',
  templateUrl: './login-org.component.html',
  styleUrls: ['./login-org.component.css'],
})
export class LoginOrgComponent {
  @Output() back = new EventEmitter<void>();

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private loginFormService: LoginFormService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  /**
   * Logs in the user.
   *
   * This function sends a login request to the server using the provided email and password. It subscribes to the response and handles the next and error callbacks accordingly.
   *
   * @return {void} This function does not return anything.
   */
  login() {
    this.loginFormService.login(this.email, this.password).subscribe({
      next: (result) => {
        console.log('Login result:', JSON.stringify(result));
        if (result === 'Sesion Iniciada') {
          // Handle successful login'
          console.log('Login successful');
          this.getInfoUser(this.email);

          // this.router.navigate(['/homepage']);
        } else {
          this.errorMessage =
            result.message || 'Login failed, please try again.';
          console.error(this.errorMessage);
        }
      },
      error: (err) => {
        console.log('Login error:');
        console.error(err);
        // Simulate checking credentials
        if (
          this.email === exampleUser.aemail &&
          this.password === exampleUser.apassword
        ) {
          user.aemail = exampleUser.aemail;
          user.apassword = exampleUser.apassword;
          user.birth_date = exampleUser.birth_date;
          user.fname = exampleUser.fname;
          user.lname = exampleUser.lname;
          user.lname2 = exampleUser.lname2;
          user.image = exampleUser.image;
          user.countryname = exampleUser.countryname;
          user.flag = exampleUser.flag;
        } else if (this.email === 'ana@gmail.com' && this.password === '1234') {
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
        } else {
          this.errorMessage = 'Login failed, please try again.';
          console.error('Error doble');
        }
      },
    });
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  goBack() {
    this.back.emit();
  }

  /**
   * Retrieves information about the user based on the provided email.
   *
   * @param {string} aemail - The email of the user.
   */
  getInfoUser(aemail: string) {
    this.loginFormService.getInfoUser(aemail).subscribe({
      next: (result) => {
        result = result[0];
        user.aemail = result.Aemail;
        user.apassword = result.Apassword;
        user.birth_date = result.Birth_date;
        user.fname = result.Fname;
        user.mname = result.Mname;
        user.lname = result.Lname;
        user.lname2 = result.Lname2;
        user.image = 'data:image/jpeg;base64,' + result.Photo;
        user.cno = result.Cno;
        this.getCountry(result.Cno);
      },
      error: (err) => {
        console.log('Get info user error:');
        console.error(err);
      },
    });
  }

  /**
   * Retrieves the country information based on the given country number.
   *
   * @param {number} cno - The country number.
   * @return {void} This function does not return a value.
   */
  getCountry(cno: number) {
    this.sharedService.getCountry().subscribe({
      next: (result: Country[]) => {
        const filteredData = result.filter((item) => item.Cnumber === cno);
        user.countryname = filteredData[0].CountryName;
        user.flag = filteredData[0].Flag;
      },
      error: (err) => {
        console.log('Get country error:');
        console.error(err);
      },
      complete: () => {
        console.log('Get all info user complete');
        console.log(JSON.stringify(user));
        this.router.navigate(['/manage']);
      },
    });
  }
}
