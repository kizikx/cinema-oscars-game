import { ActeurI } from './acteur-i';

export interface MovieI {
  title : string,
  realisator : string,
  category : string,
  duration : string,
  country : string,
  actors : ActeurI[],
  description : string,
  gameId : string
}
