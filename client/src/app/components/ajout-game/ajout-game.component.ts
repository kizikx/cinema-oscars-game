import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { Subscription } from 'rxjs';
import { GameM } from 'src/app/shared/models/game-m';
import { GameService } from 'src/app/services/game.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-game',
  templateUrl: './ajout-game.component.html',
  styleUrls: ['./ajout-game.component.css']
})
export class AjoutGameComponent implements OnInit {

  private addGameSubscription : Subscription;
  private getCategoriesSubscription : Subscription;
  public categories : CategorieM[] = [];
  public gameAjout : GameM;

  public ajoutGameForm = new FormGroup({
    nomGame : new FormControl(),
    nomCategorie : new FormControl(),
    descriptionCategorie : new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<AjoutGameComponent>,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  public ajoutGame(){
    console.log(this.categories);
    this.gameAjout = new GameM({
      name : this.ajoutGameForm.get('nomGame').value,
      categories : this.categories,
      onGoing : true
    })
    this.addGameSubscription = this.gameServ
      .addGame(this.gameAjout)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
      this.openSnackBar(this.gameAjout.name,"Ajout de la partie");
  }

  public ajoutCategories(){
    const categorieAjout = new CategorieM({
      name : this.ajoutGameForm.get('nomCategorie').value,
      description : this.ajoutGameForm.get('descriptionCategorie').value
    });
    this.categories.push(categorieAjout);
  }

  public supprimerCategories(){
    //TODO Supprimer les categories ajoutees
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
