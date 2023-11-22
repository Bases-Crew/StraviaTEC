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

  /**
   * Retrieves an array of groups from the server.
   *
   * @return {Observable<any[]>} An observable that emits an array of groups.
   */
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

  /**
   * Creates a new group.
   *
   * @param {Group} group - The group to be created.
   * @return {Observable<Group>} The created group.
   */
  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(
      `${environment.apiUrlSqlServer}/group/new`,
      group
    );
  }

  /**
   * Updates a group.
   *
   * @param {Group} group - The group object to be updated.
   * @return {Observable<Group>} - The updated group object.
   */
  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(
      `${environment.apiUrlSqlServer}/groups/${group.gname}`,
      group
    );
  }

  /**
   * Deletes a group.
   *
   * @param {string} gname - The name of the group to delete.
   * @return {Observable<any>} An observable that resolves to the response from the API call.
   */
  deleteGroup(gname: string): Observable<any> {
    return this.http.delete(`${environment.apiUrlSqlServer}/groups/${gname}`);
  }
}
