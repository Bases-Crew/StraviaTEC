import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userEmail: string | null = null;

  setEmail(email: string) {
    this.userEmail = email;
  }

  getEmail(): string | null {
    if (!this.userEmail) {
      return 'pedrog@gmail.com';
    }
    return this.userEmail;
  }
}
