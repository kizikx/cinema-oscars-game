import { Injectable } from '@angular/core';
import { Routes } from '../shared/constantes/routes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieM } from '../shared/models/movie-m';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly route = Routes.getApiRoute(Routes.movie);

  constructor(
    private readonly http: HttpClient) { }

  public getMovie(): Observable<MovieM[]>{
    return this.http.get<MovieM[]>(this.route)
    .pipe(
      map(data => data.map(item => new MovieM(item)))
    );
  }
}
