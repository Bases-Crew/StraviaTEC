import { Component, EventEmitter, Output } from '@angular/core';
import { RegisterService } from '../../services/register.service'; // Update the path as necessary
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Output() back = new EventEmitter<void>();
  // Define properties to bind to the form inputs
  fname: string = '';
  mname: string | null = null; // Make Mname nullable
  lname1: string = '';
  lname2: string = '';
  aemail: string = '';
  apassword: string = '';
  photo: File | null = null; // Make Photo nullable
  countryname: string = '';
  birth_date: string = '';
  countrynamesL: string[] = [];
  errorMessage: string | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerService.getCountries().subscribe((countries) => {
      this.countrynamesL = countries;
    });
  }

  onImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      this.photo = file; // Store the File object

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result; // Store the result for displaying the image preview
      };
      reader.readAsDataURL(file); // Read the file to display a preview
    }
  }

  // Define the registration function
  register() {
    const formData = new FormData();
    formData.append('fname', this.fname);
    if (this.mname) {
      formData.append('mname', this.mname);
    }
    formData.append('lname1', this.lname1);
    formData.append('lname2', this.lname2);
    formData.append('aemail', this.aemail);
    formData.append('apassword', this.apassword);
    formData.append('countryname', this.countryname);
    formData.append('birth_date', this.birth_date);

    if (this.photo) {
      // Check if there's a File object
      formData.append('photo', this.photo);
    }

    this.registerService.registerUser(formData).subscribe(
      (response) => {
        this.router.navigate(['/display-example']);
      },
      (error) => {
        this.errorMessage = 'Registration failed';
      }
    );
  }

  // Define a function to navigate back to the login page
  goBack() {
    this.back.emit();
  }
}
