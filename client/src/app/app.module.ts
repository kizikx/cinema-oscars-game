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
import { GameComponent } from './components/game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    AccueilComponent,
    VoteComponent,
    ChoixJoueurComponent,
    ListeGamesComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
