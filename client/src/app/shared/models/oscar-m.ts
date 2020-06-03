import { OscarI } from '../interfaces/oscar-i';

export class OscarM implements OscarI{
  gameId : string;
  name : string;
  description : string;
  vote: Array<string>;

  constructor(fields?: Partial<OscarM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
