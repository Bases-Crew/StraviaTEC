import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group.module'; // Asegúrate de que la ruta al modelo es correcta

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groups = this.groupService.getGroups();
  }

  onJoinLeave(group: Group): void {
    if (group.joined) {
      this.groupService.leaveGroup(group.id);
      group.joined = false; // Actualizar el estado en el componente
    } else {
      this.groupService.joinGroup(group.id);
      group.joined = true; // Actualizar el estado en el componente
    }
  }
}
