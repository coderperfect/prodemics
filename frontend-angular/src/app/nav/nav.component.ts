import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  public isAuth = false;
  private loggedInUserSub = new Subscription();
  public currentNavItemId = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loggedInUserSub = this.loginService.loggedInUser.subscribe(
      (loggedInUser) => {
        this.isAuth = !!loggedInUser.username;
      }
    );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map((route) => route.url)
      )
      .subscribe((url) =>
        url.subscribe((curentUrl) => {
          this.currentNavItemId = curentUrl.toString();
          // As '' is not a supported ngbnNav activeId
          if(this.currentNavItemId === '')
            this.currentNavItemId = 'home';
        })
      );
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.loginService.loggedInUser.next({ username: '', authorities: '' });

    this.router.navigate(['/login']);
  }
}
