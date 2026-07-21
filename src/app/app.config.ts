import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  importProvidersFrom
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors,
  withXhr
} from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { authInterceptor } from './login/auth-interceptor.service';
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
    provideHttpClient(
      withXhr(),
      withInterceptors([authInterceptor])
    )
  ]
};