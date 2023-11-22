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
  /**
   * Adds a bank account to the current race's list of bank accounts.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  addBankAccount() {
    if (
      this.newBankAccount !== null &&
      !this.currentRace.bankAccounts.includes(this.newBankAccount)
    ) {
      this.currentRace.bankAccounts.push(this.newBankAccount);
      this.newBankAccount = null; // Reset the input field
    }
  }

  /**
   * Removes a bank account from the current race's bankAccounts array.
   *
   * @param {number} index - The index of the bank account to remove.
   * @return {void} This function does not return a value.
   */
  removeBankAccount(index: number) {
    this.currentRace.bankAccounts.splice(index, 1);
  }

  /**
   * Adds the selected category to the current race's categories array.
   *
   * @param {none} - No parameters are needed for this function.
   * @return {none} - This function does not return anything.
   */
  addCategory() {
    if (
      this.selectedCategory &&
      !this.currentRace.categories.includes(this.selectedCategory)
    ) {
      this.currentRace.categories.push(this.selectedCategory);
      this.selectedCategory = ''; // Reset the dropdown after adding
    }
  }

  /**
   * Removes a category from the current race at the specified index.
   *
   * @param {number} index - The index of the category to be removed.
   * @return {void}
   */
  removeCategory(index: number) {
    this.currentRace.categories.splice(index, 1); // Remove the category at the specified index
  }

  /**
   * Adds the selected sponsor to the current race's sponsors array if it's not already included.
   * Resets the dropdown value after adding the sponsor.
   *
   * @param {void} - No parameters
   * @return {void} - No return value
   */
  addSponsor() {
    if (
      this.selectedSponsor &&
      !this.currentRace.sponsors.includes(this.selectedSponsor)
    ) {
      this.currentRace.sponsors.push(this.selectedSponsor);
      this.selectedSponsor = ''; // Reset the dropdown
    }
  }

  /**
   * Removes a sponsor from the current race.
   *
   * @param {number} index - The index of the sponsor to remove.
   */
  removeSponsor(index: number) {
    this.currentRace.sponsors.splice(index, 1);
  }

  /**
   * Adds the selected group to the current race's list of groups.
   * If the selected group is not already in the list, it is added.
   * Finally, the selected group is reset to an empty string.
   *
   * @param {void} None
   * @return {void} None
   */
  addGroup() {
    if (
      this.selectedGroup &&
      !this.currentRace.groups.includes(this.selectedGroup)
    ) {
      this.currentRace.groups.push(this.selectedGroup);
      this.selectedGroup = ''; // Reset the dropdown
    }
  }

  /**
   * Removes a group from the current race at the specified index.
   *
   * @param {number} index - The index of the group to remove.
   * @return {void} This function does not return anything.
   */
  removeGroup(index: number) {
    this.currentRace.groups.splice(index, 1);
  }

  /**
   * Loads a race.
   *
   * @param {Race} race - The race object to be loaded.
   */
  loadRace(race: Race) {
    this.currentRace = race;
    /*
    if (this.currentRace.route) {
      const decodedRoute = atob(this.currentRace.route);
      this.currentRace.route = decodedRoute;
    }
    */
  }

  /**
   * Toggles the display of groups based on the privacy level of the current race.
   *
   * @return {void}
   */
  toggleGroupsDisplay() {
    this.showGroups = this.currentRace.privacy > 0;
  }

  // When a race is selected for editing
  selectRaceForEdit(race: Race) {
    this.currentRace = race;
    this.showGroups = race.privacy !== 0;
  }

  constructor(private raceService: RaceService) {}

  /**
   * Initializes the component and loads the necessary data.
   *
   * @param {none} - No parameters.
   * @return {none} - No return value.
   */
  ngOnInit() {
    this.loadSports();
    this.loadSponsors();
    this.loadGroups();
    this.loadRaces();
    this.loadCategories();
  }

  /**
   * Loads the sports by calling the race service's getSports method and subscribing to the result.
   *
   * @return {void}
   */
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

  /**
   * Loads the categories by making an API call to fetch categories.
   *
   * @return {void} - This function does not return anything.
   */
  loadCategories() {
    // Replace with actual API call to fetch categories
    this.raceService.getCategories().subscribe(
      (data) => {
        this.availableCategories = data;
      },
      (error) => console.error(error)
    );
  }

  /**
   * Loads sponsors by subscribing to the getSponsors() Observable.
   *
   * @return {void} - No return value
   */
  loadSponsors() {
    // Assume getSponsors() returns an Observable<string[]>
    this.raceService.getSponsors().subscribe(
      (data) => (this.availableSponsors = data),
      (error) => console.error('Error fetching sponsors:', error)
    );
  }

  /**
   * Loads the groups by making a request to the race service.
   *
   * @return {void} This function does not return anything.
   */
  loadGroups() {
    // Assume getGroups() returns an Observable<string[]>
    this.raceService.getGroups().subscribe(
      (data) => (this.availableGroups = data),
      (error) => console.error('Error fetching groups:', error)
    );
  }

  /**
   * Sets the mode of the function.
   *
   * @param {('create' | 'edit')} mode - The mode to set.
   * @return {void} This function does not return anything.
   */
  setMode(mode: 'create' | 'edit') {
    this.mode = mode;
    if (mode === 'create') {
      this.currentRace = this.getEmptyRace();
    } else {
      this.loadRaces();
    }
  }

  /**
   * Returns an empty Race object.
   *
   * @return {Race} An empty Race object with all properties set to their default values.
   */
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

  /**
   * Loads the races by making a request to the race service.
   *
   * @return {void} No return value.
   */
  loadRaces() {
    this.raceService.getRaces().subscribe(
      (races) => ((this.races = races), console.log(races)),
      (error) => console.error(error)
    );
  }

  /**
   * Submits the form data.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
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

  /**
   * Deletes a race.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  deleteRace() {
    // Make sure to have an identifier for deletion
    // this.raceService.deleteRace(this.currentRace.id).subscribe(/* ... */);
  }
}
