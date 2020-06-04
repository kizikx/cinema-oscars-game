import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { PlayerM } from 'src/app/shared/models/player-m';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { MatDialog } from '@angular/material/dialog';
import { ChoixJoueurComponent } from '../choix-joueur/choix-joueur.component';

@Component({
  selector: 'app-liste-joueurs',
  templateUrl: './liste-joueurs.component.html',
  styleUrls: ['./liste-joueurs.component.css']
})
export class ListeJoueursComponent implements OnInit {

  private getJoueurSubscription : Subscription;
  public joueurs : PlayerM[];
  @Input() gameId : string;

  constructor(
    public dialog: MatDialog,
    private readonly playerServ : PlayerService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadJoueurs();
  }

  public loadJoueurs(){
    this.playerServ.setGameId(this.gameId)
    this.getJoueurSubscription = this.playerServ
    .getPlayer()
    .subscribe(data => {
      this.joueurs = data;
      this.cdRef.markForCheck();
    })
  }

  openDialog(joueurChoix : PlayerM): void {
    const dialogRef = this.dialog.open(ChoixJoueurComponent, {
      width: '300px',
      data: {
        name: joueurChoix.name,
        category: joueurChoix.category
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Pop up closed');
    });
  }
}
