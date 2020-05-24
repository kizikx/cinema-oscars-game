import { ActeurI } from '../interfaces/acteur-i';

export class ActeurM implements ActeurI{
  name : string;
  male : boolean;

  constructor(fields?: Partial<ActeurM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
