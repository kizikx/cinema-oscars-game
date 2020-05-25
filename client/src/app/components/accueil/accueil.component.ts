import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private getGameSubscription : Subscription;

  constructor(
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getGame();
    console.log("game "+this.getGameSubscription);
  }

  public getGame(){
    this.getGameSubscription = this.gameServ
    .getGame()
    .subscribe(data => {
      this.cdRef.markForCheck();
    })
  }
}
