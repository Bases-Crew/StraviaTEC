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

  addSponsor() {
    if (
      this.selectedSponsor &&
      !this.currentChallenge.patrocinadores.includes(this.selectedSponsor)
    ) {
      this.currentChallenge.patrocinadores.push(this.selectedSponsor);
      this.selectedSponsor = ''; // Reset the dropdown
    }
  }

  removeSponsor(index: number) {
    this.currentChallenge.patrocinadores.splice(index, 1);
  }

  addGroup() {
    if (
      this.selectedGroup &&
      !this.currentChallenge.grupos.includes(this.selectedGroup)
    ) {
      this.currentChallenge.grupos.push(this.selectedGroup);
      this.selectedGroup = ''; // Reset the dropdown
    }
  }

  removeGroup(index: number) {
    this.currentChallenge.grupos.splice(index, 1);
  }

  loadChallenge(challenge: Challenge) {
    this.currentChallenge = challenge;
  }

  toggleGroupsDisplay() {
    this.showGroups = this.currentChallenge.pid > 0;
  }

  // When a race is selected for editing
  selectRaceForEdit(challenge: Challenge) {
    this.currentChallenge = challenge;
    this.showGroups = challenge.pid > 0;
  }

  constructor(private challengeService: ChallengeService) {}

  ngOnInit() {
    this.loadSports();
    this.loadSponsors();
    this.loadGroups();
    this.loadChallenges();
  }

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

  loadSponsors() {
    // Assume getSponsors() returns an Observable<string[]>
    this.challengeService.getSponsors().subscribe(
      (data) => (this.availableSponsors = data),
      (error) => console.error('Error fetching sponsors:', error)
    );
  }

  loadGroups() {
    // Assume getGroups() returns an Observable<string[]>
    this.challengeService.getGroups().subscribe(
      (data) => (this.availableGroups = data),
      (error) => console.error('Error fetching groups:', error)
    );
  }

  setMode(mode: 'create' | 'edit') {
    this.mode = mode;
    if (mode === 'create') {
      this.currentChallenge = this.getEmptyChallenge();
    } else {
      this.loadChallenges();
    }
  }

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

  loadChallenges() {
    this.challengeService.getChallenges().subscribe(
      (challenges) => ((this.challenges = challenges), console.log(challenges)),
      (error) => console.error(error)
    );
  }

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

  deleteChallenge() {
    // Make sure to have an identifier for deletion
    // this.raceService.deleteRace(this.currentRace.id).subscribe(/* ... */);
  }
}
