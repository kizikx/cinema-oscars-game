import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { AccueilComponent } from './components/accueil/accueil.component';
import { VoteComponent } from './components/vote/vote.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ChoixJoueurComponent } from './components/choix-joueur/choix-joueur.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ListeGamesComponent } from './components/liste-games/liste-games.component';
import { AjoutGameComponent } from './components/ajout-game/ajout-game.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { PageJeuComponent } from './components/page-jeu/page-jeu.component';
import { ListeJoueursComponent } from './components/liste-joueurs/liste-joueurs.component';
import { AjoutJoueurComponent } from './components/ajout-joueur/ajout-joueur.component';



@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    AccueilComponent,
    VoteComponent,
    ChoixJoueurComponent,
    ListeGamesComponent,
    AjoutGameComponent,
    PageJeuComponent,
    ListeJoueursComponent,
    AjoutJoueurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  entryComponents: [
    AjoutGameComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
