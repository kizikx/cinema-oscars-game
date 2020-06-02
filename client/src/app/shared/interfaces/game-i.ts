import { CategorieI } from './categorie-i';

export interface GameI {
  _id : string,
  name : string,
  categories : CategorieI,
  onGoing : boolean
}
