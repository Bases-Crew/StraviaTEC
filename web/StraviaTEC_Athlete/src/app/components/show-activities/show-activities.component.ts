import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/login.model';
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

  constructor(
    private showActivitiesService: ShowActivitiesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchGetActivities();
  }

  fetchGetActivities() {
    this.showActivitiesService.getActivities(user.aemail).subscribe({
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
    // console.log(JSON.stringify(activity));
    this.router.navigate(['/map', activity.activityid]);
  }
}
