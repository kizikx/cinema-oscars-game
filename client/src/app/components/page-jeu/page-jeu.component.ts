import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { GameM } from 'src/app/shared/models/game-m';
import { OscarM } from 'src/app/shared/models/oscar-m';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import { AjoutJoueurComponent } from '../ajout-joueur/ajout-joueur.component';

@Component({
  selector: 'app-page-jeu',
  templateUrl: './page-jeu.component.html',
  styleUrls: ['./page-jeu.component.css']
})
export class PageJeuComponent implements OnInit {

  public gameId : any;
  public OscarFilm : OscarM;
  public OscarActeur : OscarM;
  public OscarRéalisateur : OscarM;

  constructor(
    public dialog: MatDialog,
    private readonly cdRef : ChangeDetectorRef,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.gameId = params.gameId;
    })
  }

  public ajoutOscars(){
    this.addGameSubscription = this.gameServ
      .addOscars(this.gameAjout)
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
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop up closed');
    });
  }
}
