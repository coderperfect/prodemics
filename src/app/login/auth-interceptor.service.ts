import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Skip ngrok warning page
  req = req.clone({headers: req.headers.append('ngrok-skip-browser-warning', 'true')});

  if (!req.url.includes('/api/auth/login')) {
    const modifiedReq = req.clone({
      headers: req.headers.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')!}`
      ),
    });

    return next(modifiedReq);
  }

  return next(req);
}