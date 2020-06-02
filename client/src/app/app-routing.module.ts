import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PageJeuComponent } from './components/page-jeu/page-jeu.component';


const routes: Routes = [
  { path : '', redirectTo: '/accueil', pathMatch: 'full' },
  { path : 'accueil', component: AccueilComponent},
  { path : 'pageJeu/:gameId', component: PageJeuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
