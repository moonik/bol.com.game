import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'game/:id/:role',
    component: GameComponent,
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
