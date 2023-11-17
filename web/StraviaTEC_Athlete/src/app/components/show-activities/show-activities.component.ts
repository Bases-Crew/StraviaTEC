import { Component } from '@angular/core';
import {
  Activity,
  activitiesExamples,
} from 'src/app/models/show-activities.model';
import { ShowActivitiesService } from 'src/app/services/show-activities.service';

@Component({
  selector: 'app-show-activities',
  templateUrl: './show-activities.component.html',
  styleUrls: ['./show-activities.component.css'],
})
export class ShowActivitiesComponent {
  activities: Activity[] = [];

  constructor(private showActivitiesService: ShowActivitiesService) {}
  ngOnInit(): void {
    this.fetchGetActivities();
  }

  fetchGetActivities() {
    this.showActivitiesService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (error) => {
        console.error('Error fetching activities:', error);
        this.activities = activitiesExamples;
      },
    });
  }

  showComments(activity: Activity) {
    console.log(JSON.stringify(activity));
  }
}
