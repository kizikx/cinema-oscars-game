import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { GameM } from 'src/app/shared/models/game-m';
import { OscarM } from 'src/app/shared/models/oscar-m';
import { MatDialog } from '@angular/material/dialog';
import { OscarService } from 'src/app/services/oscar.service';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerM } from 'src/app/shared/models/player-m';
import { PlayerService } from 'src/app/services/player.service';
import { ChoixJoueurComponent } from '../choix-joueur/choix-joueur.component';
import { AjoutJoueurComponent } from '../ajout-joueur/ajout-joueur.component';
@Component({
  selector: 'app-page-jeu',
  templateUrl: './page-jeu.component.html',
  styleUrls: ['./page-jeu.component.css']
})
export class PageJeuComponent implements OnInit {


  moviesChose: boolean = false;
  public gameId : any;
  private addOscarSubscription: Subscription;
  public OscarFilm = new OscarM ({
    gameId : this.gameId,
    name : "Meilleur film",
    description : "Oscar récompensant le meilleur film",
    vote: []});
  public OscarActeur = new OscarM ({
    gameId : this.gameId,
    name : "Meilleur acteur",
    description : "Oscar récompensant le meilleur acteur",
    vote: []});
  public OscarRealisateur = new OscarM ({
    gameId : this.gameId,
    name : "Meilleur réalisateur",
    description : "Oscar récompensant le meilleur réalisateur",
    vote: []
  });

  private getJoueurSubscription: Subscription;
  public joueurs: PlayerM[];

  constructor(
    public dialog: MatDialog,
    private readonly cdRef : ChangeDetectorRef,
    private readonly oscarServ : OscarService,
    private router: ActivatedRoute,
    public dialog2: MatDialog,
    private readonly playerServ: PlayerService,
    private readonly cdRef2: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.gameId = params.gameId;
    })
    this.loadJoueurs();
  }

  public ajoutOscars(){
    this.addOscarSubscription = this.oscarServ
      .createOscar(this.OscarFilm)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
    this.addOscarSubscription = this.oscarServ
      .createOscar(this.OscarActeur)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
    this.addOscarSubscription = this.oscarServ
      .createOscar(this.OscarRealisateur)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
  }

  public supprimerJoueur(){
    //TODO Supprimer les categories ajoutees en cas
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutJoueurComponent, {
      width: '300px',
      data: {
        _id : this.gameId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop up closed');
      this.loadJoueurs();
    });
  }

  public loadJoueurs() {
    this.playerServ.setGameId(this.gameId)
    this.getJoueurSubscription = this.playerServ
      .getPlayer()
      .subscribe(data => {
        this.joueurs = data;
        this.cdRef2.markForCheck();
      })
  }

  openDialog2(joueurChoix: PlayerM): void {
    let validate: boolean = false;
    const dialogRef = this.dialog2.open(ChoixJoueurComponent, {
      width: '300px',
      data: {
        name: joueurChoix.name,
        category: joueurChoix.category,
        gameId: this.gameId
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop up closed');
      let bool: boolean = true;
      this.joueurs.forEach(function (joueur) {
        if (joueur.category.sent != true) {
          bool = false;
        }
      })
      this.moviesChose = bool;
    });
  }
}
