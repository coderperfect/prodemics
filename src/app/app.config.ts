import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  importProvidersFrom
} from '@angular/core';

import {
  provideHttpClient,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  withXhr
} from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './login/auth-interceptor.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(
      FormsModule,
      NgbModule,
      NgbPaginationModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideHttpClient(
      withXhr(),
      withInterceptorsFromDi()
    )
  ]
};