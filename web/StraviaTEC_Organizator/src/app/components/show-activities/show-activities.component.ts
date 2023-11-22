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

  /**
   * Constructor for the class.
   *
   * @param {ShowActivitiesService} showActivitiesService - The show activities service.
   * @param {Router} router - The router.
   */
  constructor(
    private showActivitiesService: ShowActivitiesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchGetActivities();
  }

  /**
   * Fetches activities using the showActivitiesService.
   *
   * @return {void}
   */
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

  /**
   * Shows the comments for an activity.
   *
   * @param {Activity} activity - The activity object.
   * @return {void} Navigates to the map page for the specified activity.
   */
  showComments(activity: Activity) {
    // console.log(JSON.stringify(activity));
    this.router.navigate(['/map', activity.activityid]);
  }
}
