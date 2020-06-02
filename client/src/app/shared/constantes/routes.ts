import { environment } from 'src/environments/environment';

export  class Routes {
  static readonly game: string = '/game';

  static readonly extensionMovie = '/movie';
  static readonly extensionPlayer = '/player';
  static readonly extensionVote = '/vote';

  // static readonly movie: string = '/game/:gameId/movie';
  // static readonly player: string = '/game/:gameId/player';
  // static readonly vote: string = '/game/:gameId/vote';

  static getApiRoute(route : String, gameId? : string, extension? : string){
    console.log(environment.api.uri+route+gameId+extension);
    return environment.api.uri+route;
  }
}
