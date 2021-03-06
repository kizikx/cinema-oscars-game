import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import {MatDialog} from '@angular/material/dialog';
import { AjoutGameComponent } from '../ajout-game/ajout-game.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private getGameSubscription : Subscription;
  private getCategoriesSubscription: Subscription;
  public games: GameM[];

  constructor(
    public dialog: MatDialog,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGame();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutGameComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop up closed')
      this.loadGame();;
    });
  }

  public loadGame() {
    this.getGameSubscription = this.gameServ
      .getGame()
      .subscribe(data => {
        this.games = data;
        this.cdRef.markForCheck();
      })
  }
}
