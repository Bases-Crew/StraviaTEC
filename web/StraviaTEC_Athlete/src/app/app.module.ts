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

@NgModule({
  imports: [
    BrowserModule, // Esto debería estar en imports
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    // BrowserModule y FormsModule NO deben estar aquí
    AppComponent,
    HeaderComponent,
    ExampleRickMortyComponent,
    NextPageExampleComponent,
    DisplayExampleComponent,
    DisplayInitComponent,
    DisplayFriendsComponent,
    FriendsComponent,
  ],
  providers: [ExampleRickMortyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
