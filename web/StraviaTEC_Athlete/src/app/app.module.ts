import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExampleRickMortyComponent } from './components/example-rick-morty/example-rick-morty.component';
import { ExampleRickMortyService } from './services/example-rick-morty.service';
import { NextPageExampleComponent } from './components/next-page-example/next-page-example.component';
import { DisplayExampleComponent } from './components/display-example/display-example.component';
import { DisplayInitComponent } from './components/display-init/display-init.component';
import { DisplayFriendsComponent } from './components/display-friends/display-friends.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ChallengeService } from './services/challenges.service';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { TrilComponent } from './components/tril/tril.component';
import { GroupComponent } from './components/group/group.component';

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
    TrilComponent,
    GroupComponent,
  ],
  providers: [
    ExampleRickMortyService, // Asegúrate de incluir tus servicios aquí
    ChallengeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
