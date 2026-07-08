import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip ngrok warning page
    req = req.clone({headers: req.headers.append('ngrok-skip-browser-warning', 'true')});

    if (!req.url.includes('/login')) {
      const modifiedReq = req.clone({
        headers: req.headers.append(
          'Authorization',
          localStorage.getItem('token')!
        ),
      });

      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
