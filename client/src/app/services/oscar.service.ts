import { Injectable } from '@angular/core';
import { Routes } from '../shared/constantes/routes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OscarM } from '../shared/models/oscar-m';

@Injectable({
  providedIn: 'root'
})
export class OscarService {
  private gameId : string;
  private oscarId : string;
  private route : string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private readonly http: HttpClient) { }

  public getOscar(): Observable<OscarM[]>{
    this.route = Routes.getApiRoute(Routes.game, this.gameId, Routes.extensionOscar);
    return this.http.get<OscarM[]>(this.route)
    .pipe(
      map(data => data.map(item => new OscarM(item)))
    );
  }

  public createOscar(oscar : OscarM): Observable<OscarM>{
    this.route = Routes.getApiRoute(Routes.game, this.gameId, Routes.extensionOscar);
    return this.http.post<OscarM>(this.route, oscar, this.httpOptions)
   .pipe(
     map(item => new OscarM(item))
   );
  }

  public addOscarVote(oscar : OscarM): Observable<OscarM>{
    this.route = Routes.getApiRoute(Routes.game, this.gameId, Routes.extensionOscar, oscar._id);
    return this.http.post<OscarM>(this.route, oscar, this.httpOptions)
   .pipe(
     map(item => new OscarM(item))
   );
  }

  public setGameId(gameId : string){
    this.gameId = "/"+gameId;
  }

  public setOscarId(oscarId : string){
    this.oscarId = "/"+oscarId;
  }
}
