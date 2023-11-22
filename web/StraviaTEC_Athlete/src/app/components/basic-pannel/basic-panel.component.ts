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

  /**
   * Logs in the user.
   *
   * @param {void} None - This function does not take any parameters.
   * @return {void} This function does not return any value.
   */
  login() {
    this.showLoginForm = true;
    this.showRegisterForm = false;
  }

  /**
   * Registers the user.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  register() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
  }

  /**
   * Sets the showLoginForm and showRegisterForm properties to false,
   * returning the user back to the welcome page.
   */
  backToWelcome() {
    this.showLoginForm = false;
    this.showRegisterForm = false;
  }
}
