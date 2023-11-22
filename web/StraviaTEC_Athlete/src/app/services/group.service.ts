import { Injectable } from '@angular/core';
import { Group, sampleGroups } from 'src/app/models/group.model'; // Asegúrate de que la ruta al modelo es correcta

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groups: Group[] = sampleGroups;

  constructor() {}

  /**
   * Retrieves the groups.
   *
   * @return {Group[]} The array of groups.
   */
  getGroups(): Group[] {
    return this.groups;
  }

  /**
   * Joins a group based on the provided group ID.
   *
   * @param {number} groupId - The ID of the group to join.
   * @return {void} This function does not return anything.
   */
  joinGroup(groupId: number): void {
    const group = this.groups.find((group) => group.id === groupId);
    if (group) {
      group.joined = true;
      console.log(`Joined group: ${group.name}`);
    }
  }

  /**
   * Leave a group with the specified group ID.
   *
   * @param {number} groupId - The ID of the group to leave.
   * @return {void} This function does not return anything.
   */
  leaveGroup(groupId: number): void {
    const group = this.groups.find((group) => group.id === groupId);
    if (group) {
      group.joined = false;
      console.log(`Left group: ${group.name}`);
    }
  }
}
