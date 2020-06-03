import { OscarI } from '../interfaces/oscar-i';

export class OscarO implements OscarI{
  gameId : string;
  name : string;
  description : string;
  vote: Array<string>;

  constructor(fields?: Partial<OscarO>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
