import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { 
  NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase 
} from '@ng-bootstrap/ng-bootstrap/nav';

import {
  LucideMenu, LucideGraduationCap, LucideHouse, LucideSchool, LucideMegaphone, LucideUser, 
  LucideSettings, LucideLogIn, LucideLogOut
} from '@lucide/angular';

import { LoginService } from '../login/login.service';
import { NAV_ITEMS } from '../constants/nav-constants';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    RouterLink, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, LucideMenu,
    LucideGraduationCap, LucideHouse, LucideSchool, LucideMegaphone, LucideUser, LucideSettings,
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

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const match = NAV_ITEMS.find(item => this.router.url.startsWith(item.path));
        this.currentNavItemId = match?.id ?? 'home';
      });
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
