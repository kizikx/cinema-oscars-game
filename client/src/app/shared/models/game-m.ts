import { CategorieM } from './categorie-m'
import { GameI } from '../interfaces/game-i';

export class GameM implements GameI{
  _id : string;
  name : string;
  categories : CategorieM[];
  onGoing : boolean;

  constructor(fields?: Partial<GameM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
