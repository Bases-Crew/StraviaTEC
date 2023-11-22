import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DisplayExampleComponent } from './components/display-example/display-example.component';
import { InitialStageComponent } from './components/initial-stage/initial-stage.component';
import { ManagerComponent } from './components/manager/manager.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FriendsComponent } from './components/friends/friends.component';
import { DisplayChallengeComponent } from './components/display-challenge/display-challenge.component';
import { DisplayRunsComponent } from './components/display-runs/display-runs.component';
import { DisplayProfileComponent } from './components/display-profile/display-profile.component';
import { DisplayTrilComponent } from './components/display-tril/display-tril.component';
import { MapComponent } from './components/map/map.component';
import { DisplayGroupComponent } from './components/display-group/display-group.component';
import { DisplayPublishActivityComponent } from './components/display-publish-activity/display-publish-activity.component';
import { LoginOrgComponent } from './components/login-org/login-org.component';
import { DisplayReportComponent } from './components/display-report/display-report.component';
import { DisplayReportParticipantsComponent } from './components/display-report-participants/display-report-participants.component';

const routes: Routes = [
  { path: 'init', component: InitialStageComponent },
  // { path: 'init', component: LoginOrgComponent },
  { path: 'manage', component: ManagerComponent },
  { path: 'display-example', component: DisplayExampleComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'map/:id', component: MapComponent },
  { path: 'display-friends', component: FriendsComponent },
  { path: 'display-challenge', component: DisplayChallengeComponent },
  { path: 'display-runs', component: DisplayRunsComponent },
  { path: 'display-profile', component: DisplayProfileComponent },
  { path: 'display-tril', component: DisplayTrilComponent },
  { path: 'display-group', component: DisplayGroupComponent },
  {
    path: 'display-report-participants',
    component: DisplayReportParticipantsComponent,
  },
  { path: 'display-report', component: DisplayReportComponent },
  {
    path: 'display-publish-activity',
    component: DisplayPublishActivityComponent,
  },
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: '**', redirectTo: 'init' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
