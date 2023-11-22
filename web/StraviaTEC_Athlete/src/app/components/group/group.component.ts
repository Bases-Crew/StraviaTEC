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
