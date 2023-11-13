import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExampleRickMortyComponent } from './components/example-rick-morty/example-rick-morty.component';
import { NextPageExampleComponent } from './components/next-page-example/next-page-example.component';
import { DisplayExampleComponent } from './components/display-example/display-example.component';
import { DisplayInitComponent } from './components/display-init/display-init.component';
import { DisplayFriendsComponent } from './components/display-friends/display-friends.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ProfilesComponent } from './components/profiles/profiles.component';

import { ExampleRickMortyService } from './services/example-rick-morty.service';
import { ChallengeService } from './services/challenges.service';
import { FriendsService } from './services/friends.service';
import { ProfilesService } from './services/profiles.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    ExampleRickMortyComponent,
    NextPageExampleComponent,
    DisplayExampleComponent,
    DisplayInitComponent,
    DisplayFriendsComponent,
    FriendsComponent,
    ChallengesComponent,
    ProfilesComponent,
  ],
  providers: [
    ExampleRickMortyService,
    ChallengeService,
    FriendsService,
    ProfilesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
