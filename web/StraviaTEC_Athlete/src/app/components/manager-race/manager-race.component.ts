import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-race',
  templateUrl: './manager-race.component.html',
  styleUrls: ['./manager-race.component.css'],
})
export class ManagerRaceComponent {
  isCreateVisible: boolean = true;
  isEditVisible: boolean = false;

  showCreate() {
    this.isCreateVisible = true;
    this.isEditVisible = false;
  }

  showEdit() {
    this.isCreateVisible = false;
    this.isEditVisible = true;
  }
}
