import { Component, OnInit } from '@angular/core';
import { Challenge } from 'src/app/models/challenges.model';
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

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.getChallenges();
  }

  getChallenges(): void {
    this.challengeService.getChallenges().subscribe(
      (challenges) => {
        this.challenges = challenges;
        this.filterChallenges(); // Filtra los desafíos inmediatamente después de la asignación
      },
      (error) => {
        // Considera añadir manejo de errores aquí
        console.error('Error fetching challenges:', error);
      }
    );
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
        this.selectedTypes.includes(challenge.challenge_type)
      );
    } else {
      this.filteredChallenges = [...this.challenges]; // Utiliza una copia de la lista original si no hay tipos seleccionados
    }
  }
  joinChallenge(challenge: Challenge, event: Event): void {
    event.preventDefault();
    console.log('Unido a:', challenge);
  }
}
