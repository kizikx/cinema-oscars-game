import { CategorieI } from './categorie-i';

export interface GameI {
  name : string,
  categories : CategorieI,
  onGoing : boolean
}
