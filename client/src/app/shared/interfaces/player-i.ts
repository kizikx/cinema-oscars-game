import { CategorieI } from './categorie-i';

export interface PlayerI {
  name : string,
  admin : boolean,
  gameId : string,
  category : CategorieI,
  aVote : boolean,
  _id : string
}
