import { OscarI } from '../interfaces/oscar-i';

export class OscarM implements OscarI{
  _id: string;
  gameId : string;
  name : string;
  description : string;
  votes: string[];

  constructor(fields?: Partial<OscarM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
