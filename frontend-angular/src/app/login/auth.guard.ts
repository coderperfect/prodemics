import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.loginService.loggedInUser.pipe(
      map((loggedInUser) => {
        const isAuth = !!loggedInUser.username;

        if (isAuth) {
          if (route.url.toString() === 'login')
            return this.router.createUrlTree(['/']);

          return true;
        }

        if (route.url.toString() === 'login') return true;

        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
