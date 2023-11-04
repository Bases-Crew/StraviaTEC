import { Component, OnInit } from '@angular/core';
import { Challenge } from 'src/app/models/challenges.module';
import { ChallengeService } from 'src/app/services/challenges.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  challenges: Challenge[] = [];

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.getChallenges();
  }

  getChallenges(): void {
    this.challengeService
      .getChallenges()
      .subscribe((challenges) => (this.challenges = challenges));
  }
}
