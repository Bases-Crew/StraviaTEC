// basic-panel.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-panel',
  templateUrl: './basic-panel.component.html',
  styleUrls: ['./basic-panel.component.css'],
})
export class BasicPanelComponent {
  showLoginForm: boolean = false;
  showRegisterForm: boolean = false;

  login() {
    this.showLoginForm = true;
    this.showRegisterForm = false;
  }

  register() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
  }

  backToWelcome() {
    this.showLoginForm = false;
    this.showRegisterForm = false;
  }
}
