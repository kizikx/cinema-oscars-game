import { CategorieI } from './categorie-i';

export interface GameI {
  players : string,
  categories : CategorieI,
  onGoing : boolean
}
