import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { OscarService } from 'src/app/services/oscar.service';
import { Subscription } from 'rxjs';
import { MovieM } from 'src/app/shared/models/movie-m';
import { OscarM } from 'src/app/shared/models/oscar-m';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-choix-oscars',
  templateUrl: './choix-oscars.component.html',
  styleUrls: ['./choix-oscars.component.css']
})
export class ChoixOscarsComponent implements OnInit {

  private getMovieSubscription : Subscription;
  private getOscarSubscription : Subscription;
  public movieTab : MovieM[];
  private oscars : OscarM[];
  private oscarsOriginal : OscarM[];

  public ajoutOscarForm = new FormGroup({
    title : new FormControl(),
    realisator : new FormControl(),
    actor : new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ChoixOscarsComponent>,
    private readonly movieServ : MovieService,
    private readonly oscarServ : OscarService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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
      this.cdRef.markForCheck();
    })
  }

  public checkvote(oscarName: string){
    if(this.oscars.find(x=>x.name === oscarName).vote.length > this.oscarsOriginal.find(x=>x.name === oscarName).vote.length){
      this.oscars.find(x=>x.name === oscarName).vote.pop();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
