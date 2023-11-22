import { Component } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../models/challenge.model';

@Component({
  selector: 'app-manager-challenge',
  templateUrl: './manager-challenge.component.html',
  styleUrls: ['./manager-challenge.component.css'],
})
export class ManagerChallengeComponent {
  mode: 'create' | 'edit' = 'create';
  currentChallenge: Challenge = this.getEmptyChallenge();
  challenges: Challenge[] = [];
  showGroups: boolean = false;
  newGroup: string | null = null;
  availableSports: any[] = [];
  availableSponsors: any[] = []; // Replace with actual type
  availableGroups: any[] = [];
  availableCategories: any[] = []; // Replace with actual type
  selectedSponsor: string = '';
  selectedGroup: string = '';

  /**
   * Adds the selected sponsor to the current challenge's list of sponsors.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  addSponsor() {
    if (
      this.selectedSponsor &&
      !this.currentChallenge.patrocinadores.includes(this.selectedSponsor)
    ) {
      this.currentChallenge.patrocinadores.push(this.selectedSponsor);
      this.selectedSponsor = ''; // Reset the dropdown
    }
  }

  /**
   * Removes a sponsor from the current challenge.
   *
   * @param {number} index - The index of the sponsor to be removed.
   * @return {void} This function does not return a value.
   */
  removeSponsor(index: number) {
    this.currentChallenge.patrocinadores.splice(index, 1);
  }

  /**
   * Adds the selected group to the current challenge if it is not already included.
   * Resets the dropdown selection afterwards.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  addGroup() {
    if (
      this.selectedGroup &&
      !this.currentChallenge.grupos.includes(this.selectedGroup)
    ) {
      this.currentChallenge.grupos.push(this.selectedGroup);
      this.selectedGroup = ''; // Reset the dropdown
    }
  }

  /**
   * Removes a group at the specified index from the current challenge's grupos array.
   *
   * @param {number} index - The index of the group to be removed.
   * @return {void}
   */
  removeGroup(index: number) {
    this.currentChallenge.grupos.splice(index, 1);
  }

  /**
   * Loads a challenge.
   *
   * @param {Challenge} challenge - The challenge to be loaded.
   */
  loadChallenge(challenge: Challenge) {
    this.currentChallenge = challenge;
  }

  /**
   * Toggles the display of groups.
   *
   * @param {}
   * @return {}
   */
  toggleGroupsDisplay() {
    this.showGroups = this.currentChallenge.pid > 0;
  }

  // When a race is selected for editing
  selectRaceForEdit(challenge: Challenge) {
    this.currentChallenge = challenge;
    this.showGroups = challenge.pid > 0;
  }

  constructor(private challengeService: ChallengeService) {}

  /**
   * Initializes the component and loads the necessary data.
   *
   * @param None
   * @return None
   */
  ngOnInit() {
    this.loadSports();
    this.loadSponsors();
    this.loadGroups();
    this.loadChallenges();
  }

  /**
   * Load the sports data by making an API call.
   *
   * @return {void} This function does not return anything.
   */
  loadSports() {
    this.challengeService.getSports().subscribe({
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
   * Load sponsors by subscribing to the getSponsors Observable.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  loadSponsors() {
    // Assume getSponsors() returns an Observable<string[]>
    this.challengeService.getSponsors().subscribe(
      (data) => (this.availableSponsors = data),
      (error) => console.error('Error fetching sponsors:', error)
    );
  }

  /**
   * Loads the groups by subscribing to the getGroups() Observable.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  loadGroups() {
    // Assume getGroups() returns an Observable<string[]>
    this.challengeService.getGroups().subscribe(
      (data) => (this.availableGroups = data),
      (error) => console.error('Error fetching groups:', error)
    );
  }

  /**
   * Set the mode of the function.
   *
   * @param {('create' | 'edit')} mode - The mode to set.
   */
  setMode(mode: 'create' | 'edit') {
    this.mode = mode;
    if (mode === 'create') {
      this.currentChallenge = this.getEmptyChallenge();
    } else {
      this.loadChallenges();
    }
  }

  /**
   * Returns an empty Challenge object.
   *
   * @return {Challenge} An empty Challenge object with default values for all properties.
   */
  getEmptyChallenge(): Challenge {
    return {
      cname: '',
      ctype: '',
      mileage: 0,
      startDate: '',
      finalDate: '',
      pid: 0,
      sportName: '',
      patrocinadores: [],
      grupos: [],
    };
  }

  /**
   * Loads the challenges by making a GET request to the challenge service.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  loadChallenges() {
    this.challengeService.getChallenges().subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        this.challenges = data;
      },
      error: (error) => {
        console.error('Error fetching challenges:', error);
      },
      complete: () => {
        console.log('Finished fetching challenges');
      },
    });
  }

  /**
   * Submits the form data based on the mode.
   *
   * @return {void} This function does not return anything.
   */
  onSubmit() {
    if (this.mode === 'create') {
      this.challengeService
        .createChallenge(this.currentChallenge)
        .subscribe(/* ... */);
    } else {
      this.challengeService
        .updateChallege(this.currentChallenge)
        .subscribe(/* ... */);
    }
  }

  /**
   * Deletes the challenge.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  deleteChallenge() {
    // Make sure to have an identifier for deletion
    // this.raceService.deleteRace(this.currentRace.id).subscribe(/* ... */);
  }
}
