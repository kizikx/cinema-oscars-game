import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-game',
  templateUrl: './ajout-game.component.html',
  styleUrls: ['./ajout-game.component.css']
})
export class AjoutGameComponent implements OnInit {

  private addGameSubscription : Subscription;
  private getCategoriesSubscription : Subscription;
  public gameAjout : GameM;
  public categories : CategorieM[];

  constructor(
    public dialogRef: MatDialogRef<AjoutGameComponent>,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  public ajoutGame(game : GameM){
    this.addGameSubscription = this.gameServ
      .addGame(game)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
  }

  public ajoutCategories(categorieName : string, categorieDescription : string){
    let categorieAjout : CategorieM
    categorieAjout.name = categorieName;
    categorieAjout.description = categorieDescription
    this.categories.push(categorieAjout)
    console.log(this.categories);
  }

  public supprimerCategories(){
    //TODO Supprimer les categories ajoutees en cas
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
