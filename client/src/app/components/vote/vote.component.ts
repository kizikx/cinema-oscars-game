import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  private getMovieSubscription : Subscription;

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
}
