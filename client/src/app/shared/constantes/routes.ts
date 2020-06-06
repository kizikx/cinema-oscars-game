import { environment } from 'src/environments/environment';

export  class Routes {
  static readonly game: string = '/game';

  static readonly extensionMovie = '/movie';
  static readonly extensionMovieGame = '/moviegame';
  static readonly extensionPlayer = '/player';
  static readonly extensionVote = '/vote';
  static readonly extensionOscar = '/oscar';

  static getApiRoute(route : string, gameId? : string, extension? : string, id? : string){
    if(gameId && extension && id){
      return environment.api.uri+route+gameId+extension+id;
    } else if(gameId && extension){
      return environment.api.uri+route+gameId+extension;
    } else if (gameId)
      return environment.api.uri+route+gameId;
    else {
      return environment.api.uri+route;
    }
  }
}
