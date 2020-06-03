import { Component, OnInit, Inject } from '@angular/core';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { PlayerM } from 'src/app/shared/models/player-m';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-choix-joueur',
  templateUrl: './choix-joueur.component.html',
  styleUrls: ['./choix-joueur.component.css']
})
export class ChoixJoueurComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChoixJoueurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerM
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
