import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ExampleRickMortyComponent } from './components/example-rick-morty/example-rick-morty.component';

import { ExampleRickMortyService } from './services/example-rick-morty.service';
import { NextPageExampleComponent } from './components/next-page-example/next-page-example.component';
import { DisplayExampleComponent } from './components/display-example/display-example.component';
import { DisplayInitComponent } from './components/display-init/display-init.component';
import { BasicPanelComponent } from './components/basic-pannel/basic-panel.component';
import { BasicBackgroundComponent } from './components/basic-background/basic-background.component';
import { InitialStageComponent } from './components/initial-stage/initial-stage.component';
@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    ExampleRickMortyComponent,
    NextPageExampleComponent,
    DisplayExampleComponent,
    DisplayInitComponent,
    BasicPanelComponent,
    BasicBackgroundComponent,
    InitialStageComponent,
  ],
  providers: [ExampleRickMortyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
