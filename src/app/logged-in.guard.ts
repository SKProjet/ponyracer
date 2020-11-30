import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
// import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  // Deviens_un_Ninja_avec_Angular.pdf #_guards
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree {
    // Le guard doit autoriser la navigation si l’utilisateur est authentifié.
    // S’il ne l’est pas, il doit empêcher la navigation vers la route demandée,
    // et naviguer vers la page d’accueil.
    return this.userService.isLoggedIn() || this.router.parseUrl('/');
    // return true;
  }

}
