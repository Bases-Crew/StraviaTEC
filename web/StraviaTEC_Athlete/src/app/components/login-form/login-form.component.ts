// login-form.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { LoginFormService as LoginFormService } from '../../services/login-form.service'; // Update the path as necessary
import { Router } from '@angular/router';

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
          // Presumably, redirect to another route upon success
          this.router.navigate(['/display-example']); // Replace '/home' with your desired route
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
