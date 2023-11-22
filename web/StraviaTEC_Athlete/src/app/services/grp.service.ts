import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Group } from '../models/grp.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrlSqlServer}/group`).pipe(
      map((response: any[]) => {
        // Transform the property names to lowercase
        return response.map((item) => {
          const transformedItem: any = {};
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              transformedItem[key.charAt(0).toLowerCase() + key.slice(1)] =
                item[key];
            }
          }
          return transformedItem;
        });
      })
    );
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(
      `${environment.apiUrlSqlServer}/group/new`,
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
