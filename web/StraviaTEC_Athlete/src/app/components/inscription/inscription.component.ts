import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Inscription } from 'src/app/models/inscription.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  races: Inscription[] = [];
  selectedRace: Inscription | null = null;
  username: string = '';
  price: number = 0; // Asegúrate de que este campo exista en tu modelo Inscription
  email: string = '';
  cardNumber: string = '';
  inscriptions: Inscription[] = [];
  inscriptionCounter = 0;

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit(): void {
    this.inscriptionService.getRaces().subscribe(
      (racesFromService: Inscription[]) => {
        this.races = racesFromService;
      },
      (error: any) => {
        console.error('Error al cargar las carreras', error);
      }
    );
  }

  onSelectRace(): void {
    if (this.selectedRace) {
      this.price = this.selectedRace.price; // Asume que tu modelo tiene un campo price
    }
  }

  onSubmit() {
    if (!this.selectedRace) {
      window.alert('Por favor, seleccione una carrera.');
      return;
    }

    this.inscriptions.push(this.selectedRace);
    this.inscriptionCounter++;

    window.alert('Inscripción realizada con éxito.');

    console.log('Detalles de Inscripción:');
    console.log(`Race ID: ${this.selectedRace.id}`);
    console.log(`Nombre de Usuario: ${this.username}`);
    console.log(`Correo Electrónico: ${this.email}`);
    console.log(`Número de Tarjeta: ${this.cardNumber}`);
    console.log(`Número de Inscripción: ${this.inscriptionCounter}`);
  }
}
