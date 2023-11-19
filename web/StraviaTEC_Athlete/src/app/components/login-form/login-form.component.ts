// login-form.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { LoginFormService as LoginFormService } from '../../services/login-form.service'; // Update the path as necessary
import { Router } from '@angular/router';
import { exampleUser, user } from 'src/app/models/login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() back = new EventEmitter<void>();

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private loginFormService: LoginFormService,
    private router: Router
  ) {}

  login() {
    this.loginFormService.login(this.email, this.password).subscribe({
      next: (result) => {
        if (result.success) {
          // Handle successful login
          console.log('Login successful');
          user.aemail = this.email;
          user.apassword = this.password;
          user.fname = exampleUser.fname;
          user.mname = exampleUser.mname;
          user.lname = exampleUser.lname;
          user.lname2 = exampleUser.lname2;
          user.birth_date = exampleUser.birth_date;
          user.flag = exampleUser.flag;
          user.countryname = exampleUser.countryname;

          // Presumably, redirect to another route upon success
          this.router.navigate(['/homepage']); // Replace '/home' with your desired route
        } else {
          // Handle login error
          // Provide a default message if result.message is undefined
          this.errorMessage =
            result.message || 'Login failed, please try again.';
        }
      },
      error: (err) => {
        // Handle error condition
        // Provide a default message if error object doesn't contain a message
        this.errorMessage = err.message || 'An error occurred during login.';
        console.error(err);
      },
    });
  }

  goBack() {
    this.back.emit();
  }
}
