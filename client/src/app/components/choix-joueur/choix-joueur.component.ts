import { Component, OnInit } from '@angular/core';
import { CategorieM } from 'src/app/shared/models/categorie-m';
import { PlayerM } from 'src/app/shared/models/player-m';

@Component({
  selector: 'app-choix-joueur',
  templateUrl: './choix-joueur.component.html',
  styleUrls: ['./choix-joueur.component.css']
})
export class ChoixJoueurComponent implements OnInit {

  public nomFilm : string;
  public categorieAttribut : CategorieM;
  public joueur : PlayerM;

  constructor() { }

  ngOnInit(): void {
  }

}
