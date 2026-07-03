import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoticeComponent } from './notice/notice.component';
import { NoticeDetailsComponent } from './notice/notice-details/notice-details.component';
import { NoticeAddComponent } from './notice/notice-add/notice-add.component';
import { authGuard } from './login/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [authGuard],
    component: LoginComponent
  },
  {
    path: 'notice',
    canActivate: [authGuard],
    component: NoticeComponent,
    children: [
      {
        path: 'add',
        component: NoticeAddComponent
      },
      {
        path: ':id',
        component: NoticeDetailsComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent
  }
];