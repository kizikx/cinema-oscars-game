import { environment } from 'src/environments/environment';

export abstract class Routes {
  static readonly game: string = '/game';
  // static readonly movie: string = '/game//movie';
  static readonly category: string = '/category';
  // static readonly player: string = '/game//player';

  static getApiRoute(route : Routes){
    return environment.api.uri+route;
  }
}
