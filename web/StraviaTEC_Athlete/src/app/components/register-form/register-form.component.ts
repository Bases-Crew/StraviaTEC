import { Component, EventEmitter, Output } from '@angular/core';
import { RegisterService } from '../../services/register.service'; // Update the path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Output() back = new EventEmitter<void>();
  // Define properties to bind to the form inputs
  Fname: string = '';
  Mname: string | null = null; // Make Mname nullable
  Lname: string = '';
  Lname2: string = '';
  Aemail: string = '';
  Apassword: string = '';
  Photo: string | null = null; // Make Photo nullable
  Cno: number = 123456789;
  Birth_date: string = '';
  errorMessage: string | null = null;

  imageSrc: string | ArrayBuffer | null = null;

  onImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.imageSrc = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Define the registration function
  register() {}

  // Define a function to navigate back to the login page
  goBack() {
    this.back.emit();
  }
}
