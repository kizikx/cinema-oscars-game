import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlayerM } from 'src/app/shared/models/player-m';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { CategorieM } from 'src/app/shared/models/categorie-m';

@Component({
  selector: 'app-ajout-joueur',
  templateUrl: './ajout-joueur.component.html',
  styleUrls: ['./ajout-joueur.component.css']
})
export class AjoutJoueurComponent implements OnInit {

  private addJoueurSubscription : Subscription;
  private getCategorieSubscription : Subscription;
  public joueurAjout : PlayerM;
  public categories : CategorieM[];

  constructor(
    public dialogRef: MatDialogRef<AjoutJoueurComponent>,
    private readonly playerServ : PlayerService,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  public ajoutJoueur(joueur : PlayerM){
    this.addJoueurSubscription = this.playerServ
      .addPlayer(joueur)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
  }

  public loadCategories(){
    this.getCategorieSubscription = this.gameServ
    .getCategories()
    .subscribe(data => {
      this.categories = data.map(({categories}) => categories);
      console.log(this.categories);
      this.cdRef.markForCheck();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
