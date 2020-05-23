import { VoteI } from '../interfaces/vote-i';

export class VoteM implements VoteI{
  gameId : string;
  playerId : boolean;
  name : string;

  constructor(fields?: Partial<VoteM>){
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
