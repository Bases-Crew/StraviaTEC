import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DisplayExampleComponent } from './components/display-example/display-example.component';
import { InitialStageComponent } from './components/initial-stage/initial-stage.component';

const routes: Routes = [
  { path: 'init', component: InitialStageComponent },
  { path: 'display-example', component: DisplayExampleComponent },
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: '**', redirectTo: 'init' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
