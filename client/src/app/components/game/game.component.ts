import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private addGameSubscription : Subscription;
  private getCategoriesSubscription : Subscription;
  public gameAjout : GameM;
  public categories : CategorieM[];

  constructor(
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.ajoutGame(this.gameAjout);
  }

  public ajoutGame(game : GameM){
    this.addGameSubscription = this.gameServ
      .addGame(game)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
  }

  public loadCategories(){
    this.getCategoriesSubscription = this.gameServ
    .getCategories("1")
    .subscribe(data => {
      this.categories = data.map(({categories}) => categories);
      console.log(this.categories);
      this.cdRef.markForCheck();
    })
  }

  public supprimerCategories(){
    //TODO Supprimer les categories ajoutees en cas
  }
}
