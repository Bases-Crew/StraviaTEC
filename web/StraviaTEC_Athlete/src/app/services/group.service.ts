import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group, sampleGroups } from 'src/app/models/group.model'; // Asegúrate de que la ruta al modelo es correcta
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groups: Group[] = sampleGroups;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves the groups.
   *
   * @return {Group[]} The array of groups.
   */
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrlSqlServer}/group`);
  }

  /**
   * Joins a group based on the provided group ID.
   *
   * @param {number} groupId - The ID of the group to join.
   * @return {void} This function does not return anything.
   */
  joinGroup(groupId: string): void {
    const group = this.groups.find((group) => group.Gname === groupId);
    if (group) {
      group.joined = true;
      console.log(`Joined group: ${group.Gname}`);
    }
  }

  /**
   * Leave a group with the specified group ID.
   *
   * @param {number} groupId - The ID of the group to leave.
   * @return {void} This function does not return anything.
   */
  leaveGroup(groupId: string): void {
    const group = this.groups.find((group) => group.Gname === groupId);
    if (group) {
      group.joined = false;
      console.log(`Left group: ${group.Gname}`);
    }
  }
}
