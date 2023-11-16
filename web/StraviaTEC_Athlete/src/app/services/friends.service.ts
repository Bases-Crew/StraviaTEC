// friends.service.ts
import { Injectable } from '@angular/core';
import { Friend, friendsList } from 'src/app/models/friends.model'; // Importa la lista de ejemplo

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private friendsList: Friend[] = friendsList; // Usa la lista de ejemplo

  constructor() {}

  getAllFriends(): Friend[] {
    return this.friendsList;
  }

  getFriendsByName(name: string): Friend[] {
    return this.friendsList.filter((friend) =>
      friend.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }
}
