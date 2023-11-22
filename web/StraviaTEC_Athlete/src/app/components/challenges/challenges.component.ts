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

  getChallenges(): void {
    this.challengeService.getChallenges(user.aemail).subscribe({
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

  toggleType(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
    this.filterChallenges();
  }

  filterChallenges(): void {
    if (this.selectedTypes.length > 0) {
      this.filteredChallenges = this.challenges.filter((challenge) =>
        this.selectedTypes.includes(challenge.SportName)
      );
    } else {
      this.filteredChallenges = [...this.challenges];
    }
  }
  joinChallenge(challenge: Challenge, event: Event): void {
    event.preventDefault();
    console.log('Unido a:', challenge);
  }
}
