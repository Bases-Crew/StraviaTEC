// friends.component.ts
import { Component } from '@angular/core';
import { Friend } from 'src/app/models/friends.module';
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

  getFriends(): void {
    // Puedes obtener la lista original de amigos aquí,
    // posiblemente desde el servicio al iniciar el componente.
    this.originalFriendsList = this.friendsService.getAllFriends();
    this.filteredFriends = [...this.originalFriendsList]; // Inicialmente, todos los amigos están mostrados
  }
  savedFriends: Friend[] = [];
  saveAndPrintFriend(friend: Friend): void {
    this.savedFriends.push(friend); // Guarda el amigo en el arreglo, si necesitas mantener un historial
    console.log(friend); // Imprime en consola la información del amigo
  }
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
