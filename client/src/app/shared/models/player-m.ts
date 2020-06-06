import { PlayerI } from '../interfaces/player-i'
import { CategorieM } from './categorie-m';

export class PlayerM implements PlayerI{
  name : string;
  admin : boolean;
  gameId : string;
  category : CategorieM;
  aVote : boolean;
  _id : string;

  constructor(fields?: Partial<PlayerM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }

  setVote(){
    this.aVote = true;
  }
}
