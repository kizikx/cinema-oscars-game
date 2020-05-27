import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnChanges {

  private getGameSubscription : Subscription;
  private game : GameM[];

  constructor(
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getGame();
    console.log(this.game);
  }

  ngOnChanges(){

  }

  public getGame(){
    this.getGameSubscription = this.gameServ
    .getGame()
    .subscribe(data => {
      this.game = data;
      this.cdRef.markForCheck();
    })
  }
}
