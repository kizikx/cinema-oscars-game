import { PlayerI } from '../interfaces/player-i'

export class PlayerM implements PlayerI{
  name : string;
  admin : boolean;
  gameId : string;
  categoriesId : string;

  constructor(fields?: Partial<PlayerM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
