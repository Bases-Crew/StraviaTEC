import { Component, OnInit } from '@angular/core';
import { TrilService } from 'src/app/services/tril.service'; // Ajusta la ruta según tu estructura de carpetas
import { Profile } from 'src/app/models/tril.model'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-tril',
  templateUrl: './tril.component.html',
  styleUrls: ['./tril.component.css'],
})
export class TrilComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(private trilService: TrilService) {}

  ngOnInit(): void {
    this.profiles = this.trilService.getProfiles();
  }
}
