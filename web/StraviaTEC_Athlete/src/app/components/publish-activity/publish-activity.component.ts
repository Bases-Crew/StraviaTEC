import { Component } from '@angular/core';
import { CreateActivity } from 'src/app/models/create-activity.model';

@Component({
  selector: 'app-publish-activity',
  templateUrl: './publish-activity.component.html',
  styleUrls: ['./publish-activity.component.css'],
})
export class PublishActivityComponent {
  activity: CreateActivity = {
    fechaHora: new Date(),
    duracion: 0,
    tipoActividad: '',
    kilometraje: 0,
    recorrido: null,
    esCompletitud: false,
  };

  submitForm() {
    // Aquí puedes enviar la actividad al servidor o realizar las acciones necesarias
    console.log(this.activity);
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.activity.recorrido = inputElement.files[0];
    }
  }
}
