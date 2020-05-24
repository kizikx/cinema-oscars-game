import { environment } from 'src/environments/environment';

export abstract class Routes {
  static readonly game: string = '/game';
  static readonly movie: string = '/movie';
  static readonly category: string = '/category';
  static readonly player: string = '/player';

  static getApiRoute(route : Routes){
    console.log('route'+environment.api.uri+"/"+route);
    return environment.api.uri+"/"+route;
  }
}
