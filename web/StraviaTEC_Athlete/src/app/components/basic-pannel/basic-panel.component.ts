// basic-panel.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-panel',
  templateUrl: './basic-panel.component.html',
  styleUrls: ['./basic-panel.component.css'],
})
export class BasicPanelComponent {
  showLoginForm: boolean = false;

  signin() {
    this.showLoginForm = true;
  }

  signup() {
    // handle the register action
  }

  backToWelcome() {
    this.showLoginForm = false;
  }
}
