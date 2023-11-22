import { Component } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { SharedService } from '../../services/shared.service';
import { Race } from '../../models/race.model';

@Component({
  selector: 'app-manager-race',
  templateUrl: './manager-race.component.html',
  // styleUrls if needed
})
export class ManagerRaceComponent {
  mode: 'create' | 'edit' = 'create';
  currentRace: Race = this.getEmptyRace();
  races: Race[] = [];
  showGroups: boolean = false;
  newBankAccount: number | null = null;
  newGroup: string | null = null;
  availableSports: any[] = [];
  availableSponsors: any[] = []; // Replace with actual type
  availableGroups: any[] = [];
  availableCategories: any[] = []; // Replace with actual type
  selectedSponsor: string = '';
  selectedGroup: string = '';
  selectedCategory: string = '';

  addBankAccount() {
    if (
      this.newBankAccount !== null &&
      !this.currentRace.bankAccounts.includes(this.newBankAccount)
    ) {
      this.currentRace.bankAccounts.push(this.newBankAccount);
      this.newBankAccount = null; // Reset the input field
    }
  }

  removeBankAccount(index: number) {
    this.currentRace.bankAccounts.splice(index, 1);
  }

  addCategory() {
    if (
      this.selectedCategory &&
      !this.currentRace.categories.includes(this.selectedCategory)
    ) {
      this.currentRace.categories.push(this.selectedCategory);
      this.selectedCategory = ''; // Reset the dropdown after adding
    }
  }

  removeCategory(index: number) {
    this.currentRace.categories.splice(index, 1); // Remove the category at the specified index
  }

  addSponsor() {
    if (
      this.selectedSponsor &&
      !this.currentRace.sponsors.includes(this.selectedSponsor)
    ) {
      this.currentRace.sponsors.push(this.selectedSponsor);
      this.selectedSponsor = ''; // Reset the dropdown
    }
  }

  removeSponsor(index: number) {
    this.currentRace.sponsors.splice(index, 1);
  }

  addGroup() {
    if (
      this.selectedGroup &&
      !this.currentRace.groups.includes(this.selectedGroup)
    ) {
      this.currentRace.groups.push(this.selectedGroup);
      this.selectedGroup = ''; // Reset the dropdown
    }
  }

  removeGroup(index: number) {
    this.currentRace.groups.splice(index, 1);
  }

  loadRace(race: Race) {
    this.currentRace = race;
    /*
    if (this.currentRace.route) {
      const decodedRoute = atob(this.currentRace.route);
      this.currentRace.route = decodedRoute;
    }
    */
  }

  toggleGroupsDisplay() {
    this.showGroups = this.currentRace.privacy > 0;
  }

  // When a race is selected for editing
  selectRaceForEdit(race: Race) {
    this.currentRace = race;
    this.showGroups = race.privacy !== 0;
  }

  constructor(private raceService: RaceService) {}

  ngOnInit() {
    this.loadSports();
    this.loadSponsors();
    this.loadGroups();
    this.loadRaces();
    this.loadCategories();
  }

  loadSports() {
    this.raceService.getSports().subscribe({
      next: (data) => {
        this.availableSports = data;
      },
      error: (error) => {
        console.error('Error fetching sports:', error);
      },
      complete: () => {
        console.log('Finished fetching sports');
      },
    });
  }

  loadCategories() {
    // Replace with actual API call to fetch categories
    this.raceService.getCategories().subscribe(
      (data) => {
        this.availableCategories = data;
      },
      (error) => console.error(error)
    );
  }

  loadSponsors() {
    // Assume getSponsors() returns an Observable<string[]>
    this.raceService.getSponsors().subscribe(
      (data) => (this.availableSponsors = data),
      (error) => console.error('Error fetching sponsors:', error)
    );
  }

  loadGroups() {
    // Assume getGroups() returns an Observable<string[]>
    this.raceService.getGroups().subscribe(
      (data) => (this.availableGroups = data),
      (error) => console.error('Error fetching groups:', error)
    );
  }

  setMode(mode: 'create' | 'edit') {
    this.mode = mode;
    if (mode === 'create') {
      this.currentRace = this.getEmptyRace();
    } else {
      this.loadRaces();
    }
  }

  getEmptyRace(): Race {
    return {
      raceName: '',
      price: 0,
      date: '',
      route: '',
      privacy: 0,
      sportName: '',
      sponsors: [],
      categories: [],
      bankAccounts: [],
      groups: [],
    };
  }

  loadRaces() {
    this.raceService.getRaces().subscribe(
      (races) => ((this.races = races), console.log(races)),
      (error) => console.error(error)
    );
  }

  onSubmit() {
    if (this.currentRace.route == '') {
      delete this.currentRace.route;
    }
    if (this.mode === 'create') {
      this.raceService.createRace(this.currentRace).subscribe(/* ... */);
    } else {
      this.raceService.updateRace(this.currentRace).subscribe(/* ... */);
    }
  }

  deleteRace() {
    // Make sure to have an identifier for deletion
    // this.raceService.deleteRace(this.currentRace.id).subscribe(/* ... */);
  }
}
