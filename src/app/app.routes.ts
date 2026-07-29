import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoticeComponent } from './notice/notice.component';
import { NoticeDetailsComponent } from './notice/notice-details/notice-details.component';
import { NoticeFormComponent } from './notice/notice-form/notice-form.component';
import { authGuard } from './login/auth.guard';
import { SchoolClassComponent } from './school-class/school-class-component';
import { SchoolClassFormComponent } from './school-class/school-class-form-component/school-class-form-component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [authGuard],
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent
  },
  {
    path: 'notices',
    canActivate: [authGuard],
    component: NoticeComponent,
    children: [
      {
        path: 'add',
        component: NoticeFormComponent
      },
      {
        path: ':id/edit',
        component: NoticeFormComponent
      },
      {
        path: ':id',
        component: NoticeDetailsComponent
      }
    ]
  },
  {
    path: 'classes',
    canActivate: [authGuard],
    component: SchoolClassComponent,
    children: [
      {
        path: 'add',
        component: SchoolClassFormComponent
      },
      {
        path: ':id/edit',
        component: SchoolClassFormComponent
      }
    ]
  }
];