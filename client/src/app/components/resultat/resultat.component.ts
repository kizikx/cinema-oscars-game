import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { OscarService } from 'src/app/services/oscar.service';
import { PlayerService } from 'src/app/services/player.service';
import { OscarM } from '../../shared/models/oscar-m';
import { VoteM } from '../../shared/models/vote-m';
import { PlayerM } from '../../shared/models/player-m';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface VotePersonne {
  label: string;
  nombre: number;
}

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})

export class ResultatComponent implements OnInit {

  dataOscar: OscarM[] = [];
  winnerOscar: string[] = [];
  displayedColumns: string[] = ['name', 'winner'];

  constructor( private _oscarservice: OscarService) { }

  ngOnInit(): void {
    this.getOscar();
    this.countvote();
  }

  getOscar() {
    this._oscarservice!.getOscar()
      .pipe(
        map(data => {
          this.dataOscar = data;
        }),
        catchError((err) => {
          return of([]);
        })).toPromise();
  }

  countvote() {
    let votepersonne: VotePersonne[] = [];
    this.dataOscar.forEach(function (oscar) {
      oscar.vote.forEach(function (label) {
        if (votepersonne.length > 0) {
          let bool: boolean = false;
          let i = 0;
          for (i = 0; i < votepersonne.length; i++) {
            if (votepersonne[i].label == label) {
              votepersonne[i].nombre += 1;
              bool = true;
            }
          }
          if (bool == false) {
            votepersonne.push({
              label: label,
              nombre: 0
            });
          }
        } else {
          votepersonne.push({
            label: label,
            nombre: 0
          });
        }
      });
      votepersonne.sort((n1, n2) => {
        if (n1.nombre > n2.nombre) {
          return -1;
        }

        if (n1.nombre < n2.nombre) {
          return 1;
        }

        return 0;
      });
      let res = votepersonne[0].label;
      if (votepersonne.length > 1) {
        for (let f = 1; f < votepersonne.length; f++) {
          if (votepersonne[f].nombre == votepersonne[0].nombre) {
            res += " / " + votepersonne[f].label;
          }
        }
      }
      oscar.description = res;
      votepersonne = [];
    })
  }


  checkName(votepersonne: VotePersonne[], label: string): boolean {
    let bool : boolean;
    let i = 0;
    for (i = 0; i < votepersonne.length; i++) {
      if (votepersonne[i].label == label) {
        bool = true;
      }
    }
    return bool;
  }
}
