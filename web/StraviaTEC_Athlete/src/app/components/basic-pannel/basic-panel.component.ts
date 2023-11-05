// basic-panel.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-panel',
  templateUrl: './basic-panel.component.html',
  styleUrls: ['./basic-panel.component.css'],
})
export class BasicPanelComponent {
  iniciarSesion() {
    // Lógica para iniciar sesión
    console.log('Iniciar Sesión');
  }

  registrarse() {
    // Lógica para registrarse
    console.log('Registrarse');
  }
}
