import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent implements OnInit {
  allRaces: Report[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private profilesService: ProfilesService) {}

  /**
   * Initializes the component and loads all profiles.
   *
   * @return {void}
   */
  ngOnInit() {
    this.loading = true;
    try {
      this.allRaces = this.profilesService.getAllRaces();
      if (this.allRaces.length === 0) {
        throw new Error('No hay carreras disponibles');
      }
    } catch (err) {
      if (err instanceof Error) {
        this.error = err.message;
      } else {
        this.error = 'Error al cargar los detalles de las carreras';
      }
    } finally {
      this.loading = false;
    }
  }
}
