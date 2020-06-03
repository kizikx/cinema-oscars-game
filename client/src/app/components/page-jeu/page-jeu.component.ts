import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { GameM } from 'src/app/shared/models/game-m';
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
    });
  }
}
