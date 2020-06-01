import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajout-game',
  templateUrl: './ajout-game.component.html',
  styleUrls: ['./ajout-game.component.css']
})
export class AjoutGameComponent implements OnInit {

  private addGameSubscription : Subscription;
  private getCategoriesSubscription : Subscription;
  public gameAjout : GameM;
  public categories : CategorieM[] = [];

  public ajoutGameForm = new FormGroup({
    nomCategorie : new FormControl(),
    descriptionCategorie : new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<AjoutGameComponent>,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  public ajoutGame(){
    this.addGameSubscription = this.gameServ
      .addGame(this.gameAjout)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
  }

  public ajoutCategories(){
    console.log(this.ajoutGameForm.value);
    const categorieAjout = new CategorieM({
      name : this.ajoutGameForm.get('nomCategorie').value,
      description : this.ajoutGameForm.get('descriptionCategorie').value
    });
    this.categories.push(categorieAjout);
  }

  public supprimerCategories(){
    //TODO Supprimer les categories ajoutees en cas
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
