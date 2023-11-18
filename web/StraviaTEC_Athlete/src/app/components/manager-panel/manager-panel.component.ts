import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css'],
})
export class ManagerPanelComponent {
  showManageRace: boolean = false;
  showManageGroup: boolean = false;
  showManageChallenge: boolean = false;

  Race() {
    this.showManageRace = true;
    this.showManageGroup = false;
    this.showManageChallenge = false;
  }

  Group() {
    this.showManageRace = false;
    this.showManageGroup = true;
    this.showManageChallenge = false;
  }

  Challenge() {
    this.showManageRace = false;
    this.showManageGroup = false;
    this.showManageChallenge = true;
  }
}
