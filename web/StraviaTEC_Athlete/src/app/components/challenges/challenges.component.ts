import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge, challengesList } from 'src/app/models/challenges.model';
import { user } from 'src/app/models/login.model';
import { ChallengeService } from 'src/app/services/challenges.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  challenges: Challenge[] = [];
  filteredChallenges: Challenge[] = [];
  selectedTypes: string[] = [];

  constructor(
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(JSON.stringify(challengesList, null, 2));
    if (user.aemail == '') {
      this.router.navigate(['/init']);
    } else {
      this.getChallenges();
    }
  }

  /**
   * Retrieves challenges from the challenge service and assigns them to this.challenges.
   * Filters the challenges immediately after assignment.
   * Handles errors by logging them to the console.
   */
  getChallenges(): void {
    this.challengeService.getChallenges().subscribe({
      next: (challenges) => {
        console.log(JSON.stringify(challenges, null, 2));
        this.challenges = challenges;
        this.filterChallenges();
      },
      error: (error) => {
        console.error('Error fetching challenges:', error);
      },
    });
  }

  /**
   * Toggles the specified type.
   *
   * @param {string} type - The type to toggle.
   * @return {void} No return value.
   */
  toggleType(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
    this.filterChallenges();
  }

  /**
   * Filters the challenges based on the selected types.
   *
   * @return {void} Does not return anything.
   */
  filterChallenges(): void {
    if (this.selectedTypes.length > 0) {
      this.filteredChallenges = this.challenges.filter((challenge) =>
        this.selectedTypes.includes(challenge.SportName)
      );
    } else {
      this.filteredChallenges = [...this.challenges];
    }
  }

  /**
   * Joins a challenge to an event.
   *
   * @param {Challenge} challenge - The challenge to join.
   * @param {Event} event - The event where the challenge is being joined.
   * @return {void} This function does not return anything.
   */
  joinChallenge(challenge: Challenge, event: Event): void {
    event.preventDefault();
    console.log('Unido a:', challenge);
  }
}
