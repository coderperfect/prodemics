import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { NoticeComponent } from './notice/notice.component';
import { NoticeDetailsComponent } from './notice/notice-details/notice-details.component';
import { NoticeAddComponent } from './notice/notice-add/notice-add.component';

const routes: Routes = [
  { path: 'login', canActivate: [AuthGuard], component: LoginComponent },
  {
    path: 'notice',
    canActivate: [AuthGuard],
    component: NoticeComponent,
    children: [
      { path: 'add', component: NoticeAddComponent },
      { path: ':id', component: NoticeDetailsComponent }
    ],
  },
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
