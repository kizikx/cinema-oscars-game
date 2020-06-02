import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlayerM } from 'src/app/shared/models/player-m';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ajout-joueur',
  templateUrl: './ajout-joueur.component.html',
  styleUrls: ['./ajout-joueur.component.css']
})
export class AjoutJoueurComponent implements OnInit {

  private addJoueurSubscription : Subscription;
  private getCategorieSubscription : Subscription;
  public joueurAjout : PlayerM;
  public categories : CategorieM[] = [];

  public ajoutJoueurForm = new FormGroup({
    nomJoueur : new FormControl(),
    isAdministrateur : new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<AjoutJoueurComponent>,
    private readonly playerServ : PlayerService,
    private readonly gameServ : GameService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  public ajoutJoueur(){
    this.addJoueurSubscription = this.playerServ
      .addPlayer(this.joueurAjout)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
  }

  public loadCategories(){
    this.getCategorieSubscription = this.gameServ
    .getCategories()
    .subscribe(data => {
      this.categories = data.map(({categories}) => categories);
      this.cdRef.markForCheck();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
