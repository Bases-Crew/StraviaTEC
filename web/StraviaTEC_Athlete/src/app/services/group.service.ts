import { Injectable } from '@angular/core';
import { Group, sampleGroups } from 'src/app/models/group.module'; // Asegúrate de que la ruta al modelo es correcta

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groups: Group[] = sampleGroups;

  constructor() {}

  getGroups(): Group[] {
    return this.groups;
  }

  joinGroup(groupId: number): void {
    const group = this.groups.find((group) => group.id === groupId);
    if (group) {
      group.joined = true;
      console.log(`Joined group: ${group.name}`);
    }
  }

  leaveGroup(groupId: number): void {
    const group = this.groups.find((group) => group.id === groupId);
    if (group) {
      group.joined = false;
      console.log(`Left group: ${group.name}`);
    }
  }
}
