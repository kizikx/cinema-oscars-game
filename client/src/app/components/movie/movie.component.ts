import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieM } from 'src/app/shared/models/movie-m';
import { ActeurM } from 'src/app/shared/models/acteur-m';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private movieAjout : MovieM;
  public acteurs : ActeurM[]= [];
  @Input() categorieLibre : boolean;

  @Output() movieOutput = new EventEmitter<MovieM>();

  public ajoutMovieForm = new FormGroup({
    title : new FormControl(),
    realisator : new FormControl(),
    category : new FormControl(),
    duration : new FormControl(),
    country : new FormControl(),
    actors : new FormControl(),
    description : new FormControl()
  });

  public ajoutActeurForm = new FormGroup({
    name : new FormControl(),
    male : new FormControl()
  });

  constructor( ) { }

  ngOnInit(): void {
  }

  public ajoutMovieChoix(){
    this.movieAjout = new MovieM({
      title : this.ajoutMovieForm.get('title').value,
      realisator : this.ajoutMovieForm.get('realisator').value,
      category : this.ajoutMovieForm.get('category').value,
      duration : this.ajoutMovieForm.get('duration').value,
      country : this.ajoutMovieForm.get('country').value,
      actors : this.acteurs,
      description : this.ajoutMovieForm.get('description').value,
    })
  }

  public ajoutActeurs(){
    const acteurAjout = new ActeurM({
      name : this.ajoutActeurForm.get('name').value,
      male : this.ajoutActeurForm.get('male').value
    });
    this.acteurs.push(acteurAjout);
  }

  public emitChoix() {
    this.ajoutMovieChoix();
    this.movieOutput.emit(this.movieAjout);
  }
}
