import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameM } from '../shared/models/game-m';
import { map } from 'rxjs/operators';
import { Routes } from '../shared/constantes/routes';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly route = Routes.getApiRoute(Routes.game);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private readonly http: HttpClient) { }

  public getGame(): Observable<GameM[]> {
    return this.http.get<GameM[]>(this.route)
    .pipe(
      map(data => data.map(item => new GameM(item)))
    );
  }

  public addGame(game : GameM):Observable<GameM>{
    return this.http.post<GameM>(this.route, game, this.httpOptions)
    .pipe(
      map(item => new GameM(item))
    );
  }

  public getCategories(): Observable<GameM[]> {
    return this.http.get<GameM[]>(this.route)
    .pipe(
      map(data => data.map(item => new GameM(item)))
    );
  }
}
