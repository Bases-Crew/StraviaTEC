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
  showManageEntries: boolean = false;

  /**
   * Sets the visibility of different panels based on the given panel name.
   *
   * @param {string} panelName - The name of the panel to be shown.
   */
  showPanel(panelName: string) {
    this.showManageRace = panelName === 'Race';
    this.showManageGroup = panelName === 'Group';
    this.showManageChallenge = panelName === 'Challenge';
    this.showManageEntries = panelName === 'Entries';
  }
}
