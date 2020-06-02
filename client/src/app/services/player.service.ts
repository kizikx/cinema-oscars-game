import { Injectable } from '@angular/core';
import { Routes } from '../shared/constantes/routes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlayerM } from '../shared/models/player-m';
import { GameM } from '../shared/models/game-m';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private gameId : string;
  private readonly route = Routes.getApiRoute(Routes.game, this.gameId, Routes.extensionPlayer);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private readonly http: HttpClient) { }

  public getPlayer(): Observable<PlayerM[]> {
    return this.http.get<PlayerM[]>(this.route)
    .pipe(
      map(data => data.map(item => new PlayerM(item)))
    );
  }

  public addPlayer(player : PlayerM): Observable<PlayerM>{
    return this.http.post<PlayerM>(this.route, player, this.httpOptions)
    .pipe(
      map(item => new PlayerM(item))
    );
  }

  public setGameId(gameId : string){
    this.gameId = gameId;
  }
}
