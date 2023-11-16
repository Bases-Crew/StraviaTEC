import { Component, OnInit } from '@angular/core';
import {
  Character,
  ExampleRickMorty,
  exampleRickMorty,
} from 'src/app/models/example-rick-morty.model';
import { ExampleRickMortyService } from 'src/app/services/example-rick-morty.service';

@Component({
  selector: 'app-example-rick-morty',
  templateUrl: './example-rick-morty.component.html',
  styleUrls: ['./example-rick-morty.component.css'],
})
export class ExampleRickMortyComponent implements OnInit {
  characters: Character[] = [];

  constructor(private exampleRickMortyService: ExampleRickMortyService) {}

  ngOnInit() {
    this.fetchCharacters();
  }

  fetchCharacters() {
    this.exampleRickMortyService.getApi().subscribe({
      next: (data: ExampleRickMorty) => {
        console.log('Data fetched:', JSON.stringify(data, null, 2));
        this.characters = data.results;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.characters = exampleRickMorty.results;
      },
      complete: () => {
        console.log('Finished fetched');
      },
    });
  }
}
