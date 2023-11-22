import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateActivity } from 'src/app/models/create-activity.model';

@Component({
  selector: 'app-publish-activity',
  templateUrl: './publish-activity.component.html',
  styleUrls: ['./publish-activity.component.css'],
})
export class PublishActivityComponent {
  constructor(private router: Router) {}

  activity: CreateActivity = {
    fechaHora: new Date(),
    duracion: 0,
    tipoActividad: '',
    kilometraje: 0,
    recorrido: null,
    esCompletitud: false,
  };

  /**
   * Submits the form.
   *
   * @return {void} - No return value
   */
  submitForm() {
    // Aquí puedes enviar la actividad al servidor o realizar las acciones necesarias
    console.log(this.activity);
    this.router.navigate(['/homepage']);
  }

  /**
   * A function that is called when a file is selected.
   *
   * @param {Event} event - The event object triggered by the file selection.
   */
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.activity.recorrido = inputElement.files[0];
    }
  }
}
