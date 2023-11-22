// friends.component.ts
import { Component } from '@angular/core';
import { Friend } from 'src/app/models/friends.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent {
  originalFriendsList: Friend[] = []; // Guardar la lista original de amigos
  filteredFriends: Friend[] = []; // La lista filtrada que se mostrará
  searchQuery: string = '';
  isSearchPerformed: boolean = false; // Para saber si se ha realizado una búsqueda
  noResultsFound: boolean = false;

  constructor(private friendsService: FriendsService) {
    this.getFriends();
  }

  /**
   * Get the list of friends.
   *
   * @return {void} This function does not return any value.
   */
  getFriends(): void {
    // Puedes obtener la lista original de amigos aquí,
    // posiblemente desde el servicio al iniciar el componente.
    this.originalFriendsList = this.friendsService.getAllFriends();
    this.filteredFriends = [...this.originalFriendsList]; // Inicialmente, todos los amigos están mostrados
  }
  savedFriends: Friend[] = [];

  /**
   * Saves the friend in the array, if you need to keep a history, and prints the friend's information to the console.
   *
   * @param {Friend} friend - The friend to be saved and printed.
   * @return {void}
   */
  saveAndPrintFriend(friend: Friend): void {
    this.savedFriends.push(friend); // Guarda el amigo en el arreglo, si necesitas mantener un historial
    console.log(friend); // Imprime en consola la información del amigo
  }

  /**
   * Searches for a friend based on the search query and updates the filtered friends list.
   *
   * @return {void} Indica que se ha realizado una búsqueda
   */
  searchFriend(): void {
    this.isSearchPerformed = true; // Indica que se ha realizado una búsqueda
    if (this.searchQuery) {
      // Filtrar la lista de amigos basada en el query de búsqueda
      this.filteredFriends = this.originalFriendsList.filter((friend) =>
        friend.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // Si no hay búsqueda, resetear a la lista original
      this.filteredFriends = [...this.originalFriendsList];
    }
    this.noResultsFound = this.filteredFriends.length === 0; // Actualizar si hay resultados o no
  }
}
