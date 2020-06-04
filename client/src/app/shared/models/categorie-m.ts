import { CategorieI } from '../interfaces/categorie-i';

export class CategorieM implements CategorieI{
  name : string;
  description : string;
  sent : boolean;

  constructor(fields?: Partial<CategorieM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
