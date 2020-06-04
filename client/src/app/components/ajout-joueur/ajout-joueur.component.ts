import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { PlayerM } from 'src/app/shared/models/player-m';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { FormGroup, FormControl } from '@angular/forms';
import { GameM } from 'src/app/shared/models/game-m';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-joueur',
  templateUrl: './ajout-joueur.component.html',
  styleUrls: ['./ajout-joueur.component.css']
})
export class AjoutJoueurComponent implements OnInit {

  private addJoueurSubscription : Subscription;
  private getCategorieSubscription : Subscription;
  public categories : CategorieM[] = [];
  public joueurAjout : PlayerM;
  public gameId : string;

  public ajoutJoueurForm = new FormGroup({
    nomJoueur : new FormControl(),
    isAdministrateur : new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<AjoutJoueurComponent>,
    private readonly playerServ : PlayerService,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: GameM
  ) { }

  ngOnInit(): void {
    this.gameId = this.data._id
    this.loadCategories();
  }

  public ajoutJoueur(){
    const categorieAjout = this.attribuerCategorie(this.categories);

    let adminChoix : boolean;
    if(this.ajoutJoueurForm.get('isAdministrateur').value == null){
      adminChoix = false;
    } else {
      adminChoix = true;
    }

    this.joueurAjout = new PlayerM({
      name : this.ajoutJoueurForm.get('nomJoueur').value,
      category : categorieAjout,
      admin : adminChoix,
      gameId : this.gameId
    })

    console.log(this.joueurAjout);

    this.addJoueurSubscription = this.playerServ
      .addPlayer(this.joueurAjout)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
    this.openSnackBar(this.joueurAjout.name, "Ajout du joueur");

  }

  public loadCategories(){
    this.getCategorieSubscription = this.gameServ
    .getCategories(this.gameId)
    .subscribe(data => {
      this.categories = data.categories;
      this.cdRef.markForCheck();
    })
  }

  public attribuerCategorie(categories : CategorieM[]) : CategorieM{
    const entierAleatoire = Math.floor(Math.random() * (categories.length - 0+1)) + 0;
    return categories[entierAleatoire];
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
