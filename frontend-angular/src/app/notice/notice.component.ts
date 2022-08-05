import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';
import { NoticeService } from './notice.service';

interface Notice {
  title: string;
  description: string;
  createdAt: string;
}

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit, OnDestroy {
  public showAdd = false;
  public notices: Notice[] = [];
  private loggedInUserSub = new Subscription();

  constructor(
    private loginService: LoginService,
    private noticeService: NoticeService
  ) {}

  ngOnInit(): void {
    this.loggedInUserSub = this.loginService.loggedInUser.subscribe(
      (loggedInUser) => {
        this.showAdd = !!loggedInUser.username;
      }
    );

    this.noticeService.getNotice().subscribe((notices) => {
      this.notices.push(...notices);
    });
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
