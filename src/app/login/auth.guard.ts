import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.loggedInUser.pipe(
    map(loggedInUser => {
      const isAuth = !!loggedInUser.username;

      if (isAuth) {
        if (route.routeConfig?.path === 'login') {
          return router.createUrlTree(['/']);
        }
        return true;
      }

      if (route.routeConfig?.path === 'login') {
        return true;
      }

      return router.createUrlTree(['/login']);
    })
  );
};
