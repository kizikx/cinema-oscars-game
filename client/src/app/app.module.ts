import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ChoixJoueurComponent } from './components/choix-joueur/choix-joueur.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AjoutGameComponent } from './components/ajout-game/ajout-game.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { PageJeuComponent } from './components/page-jeu/page-jeu.component';
import { AjoutJoueurComponent } from './components/ajout-joueur/ajout-joueur.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChoixOscarsComponent } from './components/choix-oscars/choix-oscars.component';
import { MatSelectModule } from '@angular/material/select';
import { ResultatComponent } from './components/resultat/resultat.component';
import { ClassementComponent } from './components/classement/classement.component';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    AccueilComponent,
    ChoixJoueurComponent,
    AjoutGameComponent,
    PageJeuComponent,
    AjoutJoueurComponent,
    ChoixOscarsComponent,
    ResultatComponent,
    ClassementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule
  ],
  entryComponents: [
    AjoutGameComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
