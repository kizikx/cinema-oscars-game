import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { OscarService } from 'src/app/services/oscar.service';
import { Subscription } from 'rxjs';
import { MovieM } from 'src/app/shared/models/movie-m';
import { OscarM } from 'src/app/shared/models/oscar-m';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActeurM } from 'src/app/shared/models/acteur-m';
import { PlayerM } from '../../shared/models/player-m';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-choix-oscars',
  templateUrl: './choix-oscars.component.html',
  styleUrls: ['./choix-oscars.component.css']
})
export class ChoixOscarsComponent implements OnInit {

  private getMovieSubscription : Subscription;
  private getOscarSubscription : Subscription;
  public movieTab : MovieM[] = [];
  public actorsTab : ActeurM[] = [];
  private oscars : OscarM[] = [];
  private oscarsOriginal: OscarM[] = [];
  public gameId: string;
  public joueurChoix = new PlayerM();

  public ajoutOscarForm = new FormGroup({
    title : new FormControl(),
    realisator : new FormControl(),
    actor : new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ChoixOscarsComponent>,
    private readonly playerServ : PlayerService,
    private readonly movieServ : MovieService,
    private readonly oscarServ : OscarService,
    private readonly cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: PlayerM
  ) { }

  ngOnInit(): void {
    this.gameId = this.data.gameId;
    this.joueurChoix = this.data;
    this.oscarServ.setGameId(this.gameId);
    this.playerServ.setGameId(this.gameId);
    this.loadOscar();
    this.loadMovie();
  }

  public loadOscar(){
    this.getOscarSubscription = this.oscarServ
    .getOscar()
    .subscribe(data => {
      this.oscars = data;
      this.oscarsOriginal = data;
      this.cdRef.markForCheck();
    })
  }

  public updateOscars(){
    this.oscars.forEach(oscar => {
      this.oscarServ.setOscarId(oscar._id);
      this.oscarServ.patchOscar(oscar)
        .pipe().toPromise();
    });
    this.data.aVote = true;
    this.updateVoteJoueur();
    this.onNoClick();
  }

  updateVoteJoueur(){
    this.playerServ.setPlayerId(this.joueurChoix._id);
    this.playerServ.patchPlayer(this.joueurChoix)
      .pipe().toPromise();
  }

  public updateOscarTitle(title: string){
    this.checkvote("Meilleur film");
    this.oscars.find(x=>x.name === "Meilleur film").votes.push(title);
  }

  public updateOscarRealisator(realisator: string){
    this.checkvote("Meilleur réalisateur");
    this.oscars.find(x=>x.name === "Meilleur réalisateur").votes.push(realisator);
  }

  public updateOscarActor(actor: string){
    this.checkvote("Meilleur acteur");
    this.oscars.find(x=>x.name === "Meilleur acteur").votes.push(actor);
  }

  public loadMovie(){
    this.movieServ.setGameId(this.gameId);
    let getActeurs : ActeurM[] = this.actorsTab;
    this.getMovieSubscription = this.movieServ
    .getMovieByGameId()
    .subscribe(data => {
      this.movieTab = data;
      data.forEach(function(item){
        for(let actor of item.actors){
          getActeurs.push(actor);
        }
      });
      this.actorsTab = getActeurs;
      this.cdRef.markForCheck();
    })
  }

  public checkvote(oscarName: string){
    if(this.oscars.find(x=>x.name === oscarName).votes.length > this.oscarsOriginal.find(x=>x.name === oscarName).votes.length){
      this.oscars.find(x=>x.name === oscarName).votes.pop();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
