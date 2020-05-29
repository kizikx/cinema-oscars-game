import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieM } from 'src/app/shared/models/movie-m';
import { ActeurM } from 'src/app/shared/models/acteur-m';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private addMovieSubscription : Subscription;
  private getMovieSubscription : Subscription;

  private mockActeur = new ActeurM({
    name : 'test',
    male : true,
  })

  private mockMovie = new MovieM({
    title : 'test',
    realisator : 'test',
    category : 'test',
    duration : 'test',
    country : 'test',
    actors : this.mockActeur,
    description : 'test',
    gameId : 'test',
  });

  constructor(
    private readonly movieServ : MovieService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  public loadMovie(){
    this.getMovieSubscription = this.movieServ
    .getMovie()
    .subscribe(data => {
      this.cdRef.markForCheck();
    })
  }

  public ajoutMovie(movie : MovieM){
    this.addMovieSubscription = this.movieServ
      .addMovie(movie)
      .subscribe(data => {
        this.cdRef.markForCheck();
      })
  }
}
