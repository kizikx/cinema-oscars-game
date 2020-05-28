import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private getGameSubscription : Subscription;
  private getCategoriesSubscription : Subscription;
  private game : GameM[];
  public categories : CategorieM[];

  constructor(
    private readonly gameServ : GameService,
    private readonly movieServ : MovieService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getGame();
    console.log(this.game);
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
