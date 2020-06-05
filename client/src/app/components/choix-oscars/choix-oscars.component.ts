import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { OscarService } from 'src/app/services/oscar.service';
import { Subscription } from 'rxjs';
import { MovieM } from 'src/app/shared/models/movie-m';
import { OscarM } from 'src/app/shared/models/oscar-m';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameM } from '../../shared/models/game-m';
import { ActeurM } from 'src/app/shared/models/acteur-m';
import { PlayerM } from '../../shared/models/player-m';

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

  public ajoutOscarForm = new FormGroup({
    title : new FormControl(),
    realisator : new FormControl(),
    actor : new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ChoixOscarsComponent>,
    private readonly movieServ : MovieService,
    private readonly oscarServ : OscarService,
    private readonly cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: PlayerM
  ) { }

  ngOnInit(): void {
    this.gameId = this.data.gameId;
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
      this.oscarServ.addOscarVote(oscar);
    });
    this.data.setVote();
  }

  public updateOscarTitle(title: string){
    this.checkvote("Meilleur film");
    this.oscars.find(x=>x.name === "Meilleur film").vote.push(title);
  }

  public updateOscarRealisator(realisator: string){
    this.checkvote("Meilleur réalisateur");
    this.oscars.find(x=>x.name === "Meilleur réalisateur").vote.push(realisator);
  }

  public updateOscarActor(actor: string){
    this.checkvote("Meilleur acteur");
    this.oscars.find(x=>x.name === "Meilleur acteur").vote.push(actor);
  }

  public loadMovie(){
    this.getMovieSubscription = this.movieServ
    .getMovie()
    .subscribe(data => {
      this.movieTab = data;
    //  let toto: ActeurM[];
      data.forEach(function(item){
      //  toto.push(item.actors);
        console.log(item);
        this.actorsTab.push(item.actors);
      });
    //  this.actorsTab = toto;
      this.cdRef.markForCheck();
    })
  }

  public checkvote(oscarName: string){
    if(this.oscars.find(x=>x.name === oscarName).vote.length > this.oscarsOriginal.find(x=>x.name === oscarName).vote.length){
      this.oscars.find(x=>x.name === oscarName).vote.pop();
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
