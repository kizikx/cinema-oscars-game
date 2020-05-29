import { environment } from 'src/environments/environment';

export abstract class Routes {
  static readonly game: string = '/game';
  static readonly movie: string = '/game//movie';
  static readonly player: string = '/game//player';
  static readonly vote: string = '/game//vote';

  static getApiRoute(route : String){
    console.log(environment.api.uri+route);
    return environment.api.uri+route;
  }
}
