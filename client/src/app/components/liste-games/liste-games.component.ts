import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { GameM } from 'src/app/shared/models/game-m';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-liste-games',
  templateUrl: './liste-games.component.html',
  styleUrls: ['./liste-games.component.css']
})
export class ListeGamesComponent implements OnInit {

  private getGameSubscription : Subscription;
  public games : GameM[];

  constructor(
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadGame();
  }

  public loadGame(){
    this.getGameSubscription = this.gameServ
    .getGame()
    .subscribe(data => {
      console.log(data);
      this.games = data;
      console.log(this.games);
      this.cdRef.markForCheck();
    })
  }

  public playGame(game : GameM){

  }
}
