import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { MovieService } from 'src/app/services/movie.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private getGameSubscription : Subscription;
  private getCategoriesSubscription : Subscription;
  private game : GameM[];

  constructor(
    public dialog: MatDialog,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getGame();
  }

  public getGame(){
    this.getGameSubscription = this.gameServ
    .getGame()
    .subscribe(data => {
      this.game = data;
      this.cdRef.markForCheck();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop up closed');
    });
  }
}
