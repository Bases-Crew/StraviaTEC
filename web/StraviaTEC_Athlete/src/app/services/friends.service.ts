// friends.service.ts
import { Injectable } from '@angular/core';
import { Friend, friendsList } from 'src/app/models/friends.model'; // Importa la lista de ejemplo

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private friendsList: Friend[] = friendsList; // Usa la lista de ejemplo

  constructor() {}

  /**
   * Retrieves all friends.
   *
   * @return {Friend[]} An array of Friend objects representing all the friends.
   */
  getAllFriends(): Friend[] {
    return this.friendsList;
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
}
