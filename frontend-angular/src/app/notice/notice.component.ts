import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';
import { NoticeService } from './notice.service';

interface Notice {
  id: number,
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
    private noticeService: NoticeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserSub = this.loginService.loggedInUser.subscribe(
      (loggedInUser) => {
        this.showAdd = !!loggedInUser.authorities.toString().includes('admin');
      }
    );

    this.noticeService.getNotice().subscribe((notices) => {
      this.notices.push(...notices);
    });
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }

  onNoticeSummaryClick(event: {id: number}) {
    this.router.navigate([`/notice/${event.id}`]);
  }
}
