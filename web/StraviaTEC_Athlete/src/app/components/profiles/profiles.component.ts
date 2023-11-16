import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Profile } from 'src/app/models/profiles.module'; // Asegúrate de que el nombre del archivo del modelo es correcto

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent implements OnInit {
  profiles: Profile[] = []; // Cambiado a un array de perfiles

  constructor(private profilesService: ProfilesService) {}

  ngOnInit(): void {
    this.profiles = this.profilesService.getProfiles(); // Cargamos todos los perfiles
  }
}
