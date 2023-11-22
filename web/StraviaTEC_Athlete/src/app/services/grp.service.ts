import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/grp.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrlSqlServer}/api/group`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(
      `${environment.apiUrlSqlServer}/api/group/new`,
      group
    );
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(
      `${environment.apiUrlSqlServer}/groups/${group.gname}`,
      group
    );
  }

  deleteGroup(gname: string): Observable<any> {
    return this.http.delete(`${environment.apiUrlSqlServer}/groups/${gname}`);
  }
}
