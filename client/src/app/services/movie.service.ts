import { Injectable } from '@angular/core';
import { Routes } from '../shared/constantes/routes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieM } from '../shared/models/movie-m';
import { CategorieM } from '../shared/models/categorie-m';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private gameId : string;
  private route : string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private readonly http: HttpClient) { }

  public getMovie(): Observable<MovieM[]>{
    this.route = Routes.getApiRoute(Routes.game, this.gameId, Routes.extensionMovie);
    return this.http.get<MovieM[]>(this.route)
    .pipe(
      map(data => data.map(item => new MovieM(item)))
    );
  }

  public getMovieByGameId(): Observable<MovieM[]>{//game/:gameId/moviegame Routes.extensionMovieGame
    this.route = Routes.getApiRoute(Routes.game, "/5edab802ab1096b95aff71a7", Routes.extensionMovieGame);
    console.log(this.route);
    return this.http.get<MovieM[]>(this.route)
    .pipe(
      map(data => data.map(item => new MovieM(item)))
    );
  }

  public addMovie(movie : MovieM): Observable<MovieM>{
    this.route = Routes.getApiRoute(Routes.game, this.gameId, Routes.extensionMovie);
    return this.http.post<MovieM>(this.route, movie, this.httpOptions)
   .pipe(
     map(item => new MovieM(item))
   );
  }

  public setGameId(gameId : string){
    this.gameId = "/"+gameId;
  }
}
