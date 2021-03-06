import { Component, OnInit, Inject, ChangeDetectorRef, Input } from '@angular/core';
import { PlayerM } from 'src/app/shared/models/player-m';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MovieM } from 'src/app/shared/models/movie-m';
import { MovieService } from 'src/app/services/movie.service';
import { PlayerService } from 'src/app/services/player.service';
import { Subscription, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-choix-joueur',
  templateUrl: './choix-joueur.component.html',
  styleUrls: ['./choix-joueur.component.css']
})
export class ChoixJoueurComponent implements OnInit {

  private filmLibreAjout = new MovieM();
  private filmCategorie = new MovieM();
  private addMovieSubscription : Subscription;
  public joueurChoix = new PlayerM();

  constructor(
    private readonly movieServ : MovieService,
    private readonly playerServ : PlayerService,
    private readonly cdRef : ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChoixJoueurComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: PlayerM
  ) { }

  ngOnInit(): void {
    this.joueurChoix = this.data;
  }

  public addMovie() {
    this.data.categories.sent = true;
    this.movieServ.setGameId(this.data.gameId);
    this.playerServ.setGameId(this.data.gameId);
    this.filmLibreAjout.gameId = this.data.gameId;
    this.filmCategorie.gameId = this.data.gameId;
    this.filmCategorie.category = this.data.categories.name;
    this.addMovieSubscription = this.movieServ
      .addMovie(this.filmLibreAjout)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })

      this.addMovieSubscription = this.movieServ
      .addMovie(this.filmCategorie)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
    this.data.categories.sent = true;
    this.updateChoixJoueur();
    this.openSnackBar(this.filmLibreAjout.title+" et "+this.filmCategorie.title,"Choix des films");
  }

  updateChoixJoueur(){
    console.log(this.joueurChoix);
    this.playerServ.setPlayerId(this.joueurChoix._id);
    this.playerServ.patchPlayer(this.joueurChoix)
      .pipe().toPromise();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFilmCategorie(movie : MovieM){
    this.filmCategorie = movie;
  }

  getFilmChoixLibre(movie : MovieM){
    this.filmLibreAjout = movie;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
    this.onNoClick();
  }
}
