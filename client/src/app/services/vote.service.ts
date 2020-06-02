import { Injectable } from '@angular/core';
import { Routes } from '../shared/constantes/routes';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { VoteM } from '../shared/models/vote-m';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private readonly route = Routes.getApiRoute(Routes.extensionVote);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private readonly http: HttpClient) { }

  public getPlayer(): Observable<VoteM[]> {
    return this.http.get<VoteM[]>(this.route)
    .pipe(
      map(data => data.map(item => new VoteM(item)))
    );
  }

  public addPlayer(vote : VoteM): Observable<VoteM>{
    return this.http.post<VoteM>(this.route, vote, this.httpOptions)
    .pipe(
      map(item => new VoteM(item))
    );
  }
}
