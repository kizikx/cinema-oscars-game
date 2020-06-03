import { ActeurM } from './acteur-m';
import { MovieI } from '../interfaces/movie-i';

export class MovieM implements MovieI{
  title : string;
  realisator : string;
  category : string;
  duration : string;
  country : string;
  actors : ActeurM[];
  description : string;
  gameId : string;

  constructor(fields?: Partial<MovieM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
