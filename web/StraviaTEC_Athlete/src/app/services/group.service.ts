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

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrlSqlServer}/group`);
  }

  joinGroup(groupId: string): void {
    const group = this.groups.find((group) => group.Gname === groupId);
    if (group) {
      group.joined = true;
      console.log(`Joined group: ${group.Gname}`);
    }
  }

  leaveGroup(groupId: string): void {
    const group = this.groups.find((group) => group.Gname === groupId);
    if (group) {
      group.joined = false;
      console.log(`Left group: ${group.Gname}`);
    }
  }
}
