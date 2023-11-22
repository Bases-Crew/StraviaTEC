import { Component, OnInit } from '@angular/core';
import { DataFetchService } from '../../services/entries.service';

@Component({
  selector: 'app-manager-entries',
  templateUrl: './manager-entries.component.html',
  styleUrls: ['./manager-entries.component.css'],
})
export class ManagerEntriesComponent implements OnInit {
  races: any[] = [];
  users: any[] = [];
  selectedRace: string = '';
  selectedUser: string = '';

  constructor(private dataFetchService: DataFetchService) {}

  /**
   * Initializes the component and fetches races and emails from the data fetch service.
   *
   * @return {void} This function does not return anything.
   */
  ngOnInit(): void {
    this.dataFetchService.getRaces().subscribe({
      next: (data) => ((this.races = data), console.log(data)),
      error: (error) => console.error(error),
    });

    this.dataFetchService.getEmails().subscribe({
      next: (data) => ((this.users = data), console.log(data)),
      error: (error) => console.error(error),
    });
  }

  /**
   * A function that handles the "Aceptar" action.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  onAccept() {
    console.log('Accepted with:', this.selectedRace, this.selectedUser);
    // Implement your logic for "Aceptar" action
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  onDecline() {
    console.log('Declined with:', this.selectedRace, this.selectedUser);
    // Implement your logic for "Declinar" action
  }
}
