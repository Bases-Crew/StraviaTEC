import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group.model'; // Asegúrate de que la ruta al modelo es correcta

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService) {}

  /**
   * Initializes the component and assigns the result of the `getGroups()` method
   * from the `groupService` to the `groups` variable.
   *
   * @param {void} - No parameters
   * @return {void} - No return value
   */
  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
      },
    });
  }

  /**
   * Executes the necessary actions when a user joins or leaves a group.
   *
   * @param {Group} group - The group object representing the group being joined or left.
   * @return {void} This function does not return anything.
   */
  onJoinLeave(group: Group): void {
    if (group.joined) {
      this.groupService.leaveGroup(group.Gname);
      group.joined = false; // Actualizar el estado en el componente
    } else {
      this.groupService.joinGroup(group.Gname);
      group.joined = true; // Actualizar el estado en el componente
    }
  }
}
