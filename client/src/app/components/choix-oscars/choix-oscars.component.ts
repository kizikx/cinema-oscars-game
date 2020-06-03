import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { OscarService } from 'src/app/services/oscar.service';
import { Subscription } from 'rxjs';
import { MovieM } from 'src/app/shared/models/movie-m';

@Component({
  selector: 'app-choix-oscars',
  templateUrl: './choix-oscars.component.html',
  styleUrls: ['./choix-oscars.component.css']
})
export class ChoixOscarsComponent implements OnInit {

  private getMovieSubscription : Subscription;
  private getOscarSubscription : Subscription;
  public movieTab : MovieM[]

  constructor(
    private readonly movieServ : MovieService,
    private readonly oscarServ : OscarService,
    private readonly cdRef : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMovie();
  }

  public loadOscar(){
    this.getOscarSubscription = this.oscarServ
    .getOscar()
    .subscribe(data => {
      this.cdRef.markForCheck();
    })
  }

  public loadMovie(){
    this.getMovieSubscription = this.movieServ
    .getMovie()
    .subscribe(data => {
      this.movieTab = data;
      this.cdRef.markForCheck();
    })
  }

}
