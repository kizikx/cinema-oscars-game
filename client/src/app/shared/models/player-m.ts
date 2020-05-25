import { PlayerI } from '../interfaces/player-i'
import { CategorieM } from './categorie-m';

export class PlayerM implements PlayerI{
  name : string;
  admin : boolean;
  gameId : string;
  category : CategorieM

  constructor(fields?: Partial<PlayerM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
