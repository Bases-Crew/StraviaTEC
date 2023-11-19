import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/models/login.model';
import {
  Activity,
  activitiesExamples,
} from 'src/app/models/show-activities.model';
import { MapService } from 'src/app/services/map.service';
import { ShowActivitiesService } from 'src/app/services/show-activities.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(
    private _mapService: MapService,
    private _route: ActivatedRoute,
    private showActivitiesService: ShowActivitiesService
  ) {}
  activities: Activity[] = [];
  activity: Activity | undefined;
  activityName: string = '';
  activityComments: string = '';
  activityDate: Date = new Date();
  activityDistance: number = 0;

  ngOnInit() {
    this.showActivitiesService.getActivities(user.aemail).subscribe({
      next: (data) => {
        this.activities = data;
        this.initMap();
      },
      error: (error) => {
        console.error('Error fetching activities:', error);
        this.activities = activitiesExamples;
        this.initMap();
      },
    });
  }

  initMap() {
    this.activity = this.activities
      .slice(0)
      .find((run) => run.activityid == this._route.snapshot.params['id']);

    if (!this.activity) {
      // Handle the case where no matching activity is found
      console.error('No matching activity found');
      return;
    }

    console.log(JSON.stringify(this.activity));
    console.log('Plotting route');
    if (this.activity && this.activity.route) {
      this._mapService.plotActivity(this.activity.route);
    } else {
      console.error('Activity or route is undefined');
    }
    this.activityName = this.activity.auser;
    this.activityComments = this.activity.aduration;
    this.activityDistance = this.activity.millage;
  }
}
