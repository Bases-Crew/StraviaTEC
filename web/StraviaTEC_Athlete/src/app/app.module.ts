import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ExampleRickMortyService } from './services/example-rick-morty.service';
import { ChallengeService } from './services/challenges.service';
import { FriendsService } from './services/friends.service';
import { ProfilesService } from './services/profiles.service';
import { LoginFormService } from './services/login-form.service';

import { HeaderComponent } from './components/header/header.component';
import { ExampleRickMortyComponent } from './components/example-rick-morty/example-rick-morty.component';
import { NextPageExampleComponent } from './components/next-page-example/next-page-example.component';
import { DisplayExampleComponent } from './components/display-example/display-example.component';
import { DisplayFriendsComponent } from './components/display-friends/display-friends.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { TrilComponent } from './components/tril/tril.component';
import { GroupComponent } from './components/group/group.component';
import { BasicPanelComponent } from './components/basic-pannel/basic-panel.component';
import { BasicBackgroundComponent } from './components/basic-background/basic-background.component';
import { InitialStageComponent } from './components/initial-stage/initial-stage.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowActivitiesComponent } from './components/show-activities/show-activities.component';
import { ReportComponent } from './components/report/report.component';
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    ExampleRickMortyComponent,
    NextPageExampleComponent,
    DisplayExampleComponent,
    DisplayFriendsComponent,
    FriendsComponent,
    ChallengesComponent,
    ProfilesComponent,
    TrilComponent,
    GroupComponent,
    FooterComponent,
    BasicPanelComponent,
    BasicBackgroundComponent,
    InitialStageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ShowActivitiesComponent,
    ReportComponent,
  ],
  providers: [
    ExampleRickMortyService,
    ChallengeService,
    FriendsService,
    ProfilesService,
    LoginFormService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
