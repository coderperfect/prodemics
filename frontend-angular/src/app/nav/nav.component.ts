import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  public isAuth = false;
  private loggedInUserSub = new Subscription();

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
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }

  onLogout() {
    this.router.navigate(['/login']);
    this.loginService.loggedInUser.next({ username: '' });
  }
}
