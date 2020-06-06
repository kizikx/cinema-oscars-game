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
import { ChoixOscarsComponent } from '../choix-oscars/choix-oscars.component';
@Component({
  selector: 'app-page-jeu',
  templateUrl: './page-jeu.component.html',
  styleUrls: ['./page-jeu.component.css']
})
export class PageJeuComponent implements OnInit {

  moviesChose: boolean = false;
  // votesOscar: boolean = false;
  public gameId : string;
  private addOscarSubscription: Subscription;
  private getJoueurSubscription: Subscription;
  public joueurs: PlayerM[];

  constructor(
    public dialog: MatDialog,
    private readonly cdRef : ChangeDetectorRef,
    private readonly oscarServ : OscarService,
    private router: ActivatedRoute,
    public dialog2: MatDialog,
    private readonly playerServ: PlayerService,
    private readonly cdRef2: ChangeDetectorRef,
    public dialog3: MatDialog,
    private readonly cdRef3: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.gameId = params.gameId;
    })
    this.loadJoueurs();
   // this.ajoutOscars();
    // this.checkFilmChose();
  }

  public ajoutOscars(){
    const oscarFilm = new OscarM ({
      gameId : this.gameId,
      name : "Meilleur film",
      description : "Oscar récompensant le meilleur film",
      vote: []});
    const oscarActeur = new OscarM ({
      gameId : this.gameId,
      name : "Meilleur acteur",
      description : "Oscar récompensant le meilleur acteur",
      vote: []});
    const oscarRealisateur = new OscarM ({
      gameId : this.gameId,
      name : "Meilleur réalisateur",
      description : "Oscar récompensant le meilleur réalisateur",
      vote: []
    });
    this.oscarServ.setGameId(this.gameId);
    this.addOscarSubscription = this.oscarServ
      .createOscar(oscarFilm)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
    this.addOscarSubscription = this.oscarServ
      .createOscar(oscarActeur)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
    this.addOscarSubscription = this.oscarServ
      .createOscar(oscarRealisateur)
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

  public verifChoix() : boolean{
    if(this.joueurs){
      for(let joueur of this.joueurs){
        console.log(joueur);
        if(joueur.aVote == false){
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  // checkFilmChose() {
  //   let monObjet = localStorage.getItem('filmChose');
  //   if (monObjet == this.gameId) {
  //     this.moviesChose = true;
  //   }
  // }

  openDialog2(joueurChoix: PlayerM): void {
    let validate: boolean = false;
    const dialogRef = this.dialog2.open(ChoixJoueurComponent, {
      width: '300px',
      data: {
        name: joueurChoix.name,
        category: joueurChoix.category,
        gameId: this.gameId,
        _id: joueurChoix._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // let bool: boolean = true;
      // this.joueurs.forEach(function (joueur) {
      //   if (joueur.category.sent != true) {
      //     bool = false;
      //   }
      // })
      // if (bool = true) {
      //   localStorage.setItem('filmChose', this.gameId);
      // }
      // this.moviesChose = bool;
    });
  }

  openDialog3(joueurChoix: PlayerM): void {
    const dialogRef = this.dialog3.open(ChoixOscarsComponent, {
      width: '300px',
      data: {
          name: joueurChoix.name,
          category: joueurChoix.category,
          gameId: this.gameId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.verifChoix();
      // let bool: boolean = true;
      // this.joueurs.forEach(function (joueur) {
      //   if (joueur.aVote != true) {
      //     bool = false;
      //   }
      // })
      // this.votesOscar = bool;
    });
  }
}
