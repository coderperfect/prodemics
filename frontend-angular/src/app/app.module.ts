import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { NoticeComponent } from './notice/notice.component';
import { NoticeDetailsComponent } from './notice/notice-details/notice-details.component';
import { NoticeAddComponent } from './notice/notice-add/notice-add.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './login/auth-interceptor.service';
import { NoticeSummaryComponent } from './notice/notice-summary/notice-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    NoticeComponent,
    NoticeDetailsComponent,
    NoticeAddComponent,
    HomeComponent,
    NoticeSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
