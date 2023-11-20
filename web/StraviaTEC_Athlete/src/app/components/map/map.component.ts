import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/comments.model';
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
  activityDuration: string = '';
  activityDate: Date = new Date();
  activityDistance: number = 0;
  activityComments: Comments[] = [];
  newComment: string = '';

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

  fetchComments(id: number) {
    this._mapService.getActivityComments(id).subscribe({
      next: (data) => {
        this.activityComments = data;
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
        this.activityComments = [];
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
    this.activityDuration = this.activity.aduration;
    this.activityDistance = this.activity.millage;
    this.fetchComments(this.activity.activityid);
  }

  submitComment() {
    if (!this.newComment.trim()) {
      console.error('Comment is empty');
      return;
    }

    this._mapService.postComment(user.aemail, this.newComment).subscribe({
      next: (data: Comments[]) => {
        console.log(data);
        // this.activityComments = data;
        this.activityComments = this.activityComments.concat(data);
      },
      error: (error) => {
        console.error('Error posting comment:', error);
      },
    });
  }
}
