import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment, RouterLink } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { 
  NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase 
} from '@ng-bootstrap/ng-bootstrap/nav';
import {
  LucideMenu, LucideGraduationCap, LucideHouse, LucideMegaphone, LucideUser, LucideSettings,
  LucideLogIn, LucideLogOut
} from '@lucide/angular';

import { LoginService } from '../login/login.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    RouterLink, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, LucideMenu,
    LucideGraduationCap, LucideHouse, LucideMegaphone, LucideUser, LucideSettings,
    LucideLogIn, LucideLogOut
  ]
})
export class NavComponent implements OnInit, OnDestroy {
  public isAuth = false;
  public username = '';
  public authorities = '';
  private loggedInUserSub = new Subscription();
  public currentNavItemId = '';

  readonly navDrawerOpen = signal(false);
  readonly userDrawerOpen = signal(false);

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  get initials(): string {
    if (!this.username) return '';

    return this.username
      .split(' ')
      .map(name => name[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  get displayRole(): string {
    if (!this.authorities) {
      return '';
    }

    const roleMap: Record<string, string> = {
      student: 'Student',
      admin: 'Administrator'
    };

    const hiddenRoles = ['FACTOR_PASSWORD'];

    return this.authorities
      .split(' ')
      .filter(role => !hiddenRoles.includes(role))
      .map(role => roleMap[role.trim()] ?? role)
      .join(' • ');
  }

  ngOnInit(): void {
    this.loggedInUserSub = this.loginService.loggedInUser.subscribe(
      (loggedInUser) => {
        this.isAuth = !!loggedInUser.username;
        this.username = String(loggedInUser.username);
        this.authorities = String(loggedInUser.authorities);
      }
    );

    // For url we have to wait for NavigationEnd event and then only can subscribe to ActivatedRoute url
    // That's why we need Router in addition to ActivatedRoute. For fragment however ActivatedRoute
    // is enough as there is no router event there we are in the same route.
    // The while loop is to get only the last part of the url.
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

  toggleNavDrawer() {
    this.navDrawerOpen.update(open => !open);
    this.userDrawerOpen.set(false);
  }

  toggleUserDrawer() {
    this.userDrawerOpen.update(open => !open);
    this.navDrawerOpen.set(false);
  }

  closeDrawers() {
    this.navDrawerOpen.set(false);
    this.userDrawerOpen.set(false);
  }
}
