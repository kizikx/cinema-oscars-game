import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { PlayerM } from 'src/app/shared/models/player-m';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

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
}
