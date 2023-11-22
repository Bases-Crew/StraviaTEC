// friends.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/friends.model';
import { user } from 'src/app/models/login.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent {
  originalFriendsList: Friend[] = [];
  filteredFriends: Friend[] = [];
  searchQuery: string = '';
  isSearchPerformed: boolean = false;
  noResultsFound: boolean = false;

  constructor(private friendsService: FriendsService, private router: Router) {
    this.getFriends();
  }

  ngOnInit(): void {
    if (user.aemail == '') {
      this.router.navigate(['/init']);
    }
  }

  /**
   * Get the list of friends.
   *
   * @return {void} This function does not return any value.
   */
  getFriends(): void {
    this.friendsService.getAllFriends(user.aemail).subscribe({
      next: (friends) => {
        console.log(JSON.stringify(friends));
        this.originalFriendsList = friends;
        this.filteredFriends = [...this.originalFriendsList];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  savedFriends: Friend[] = [];

  /**
   * Saves the friend in the array, if you need to keep a history, and prints the friend's information to the console.
   *
   * @param {Friend} friend - The friend to be saved and printed.
   * @return {void}
   */

  saveAndPrintFriend(friend: Friend): void {
    this.friendsService.postFollowUpdate(user.aemail, friend.Aemail).subscribe({
      next: (friends) => {
        console.log(JSON.stringify(friends));
        this.originalFriendsList = friends;
        this.filteredFriends = [...this.originalFriendsList];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Searches for a friend based on the search query and updates the filtered friends list.
   *
   * @return {void} Indica que se ha realizado una búsqueda
   */
  searchFriend(): void {
    this.isSearchPerformed = true;
    if (this.searchQuery) {
      this.filteredFriends = this.originalFriendsList.filter((friend) =>
        friend.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredFriends = [...this.originalFriendsList];
    }
    this.noResultsFound = this.filteredFriends.length === 0;
  }
}
