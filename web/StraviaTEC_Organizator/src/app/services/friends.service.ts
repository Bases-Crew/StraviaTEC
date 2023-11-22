// friends.service.ts
import { Injectable } from '@angular/core';
import { Friend, friendsList } from 'src/app/models/friends.model'; // Importa la lista de ejemplo
import { environment } from '../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private friendsList: Friend[] = friendsList; // Usa la lista de ejemplo

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all friends.
   *
   * @return {Friend[]} An array of Friend objects representing all the friends.
   */
  getAllFriends(aemail: string): Observable<Friend[]> {
    const params = new HttpParams().set('aemail', aemail);
    return this.http.get<Friend[]>(
      environment.apiUrlSqlServer + '/follow/all',
      {
        params,
      }
    );
  }

  /**
   * Retrieves friends by name from the friends list.
   *
   * @param {string} name - The name to search for in the friends list.
   * @return {Friend[]} - An array of friends whose names match the given name.
   */
  getFriendsByName(name: string): Friend[] {
    return this.friendsList.filter((friend) =>
      friend.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }

  postFollowUpdate(afollower: string, afollows: string): Observable<Friend[]> {
    const body = { afollower, afollows };
    return this.http.post<Friend[]>(
      environment.apiUrlSqlServer + '/follow/update',
      body
    );
  }
}
