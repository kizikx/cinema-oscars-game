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
  private readonly route = Routes.getApiRoute(Routes.movie);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private readonly http: HttpClient) { }

  public getMovie(): Observable<MovieM[]>{
    console.log("route "+this.route);
    return this.http.get<MovieM[]>(this.route)
    .pipe(
      map(data => data.map(item => new MovieM(item)))
    );
  }

  public addMovie(movie : MovieM): Observable<MovieM>{
    console.log("route "+this.route);
    return this.http.post<MovieM>(this.route, movie, this.httpOptions)
   .pipe(
     map(item => new MovieM(item))
   );
  }
}
