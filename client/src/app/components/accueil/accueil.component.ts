import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { MovieService } from 'src/app/services/movie.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AjoutGameComponent } from '../ajout-game/ajout-game.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private getGameSubscription : Subscription;
  private getCategoriesSubscription : Subscription;

  constructor(
    public dialog: MatDialog,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutGameComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop up closed');
    });
  }
}
