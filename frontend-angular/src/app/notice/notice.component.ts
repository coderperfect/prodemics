import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit, OnDestroy {
  public showAdd = false;
  public notices = [
    {
      title: 'Mid Term Exam',
      details: 'Mid term exam going to start from 1st July',
      date: '04/06/2022',
    },
    {
      title: 'Summer Vacation',
      details: 'Summer Vacation going to start from 1st August',
      date: '09/06/2022',
    },
  ];
  private loggedInUserSub = new Subscription();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loggedInUserSub = this.loginService.loggedInUser.subscribe(
      (loggedInUser) => {
        console.log(`user: ${JSON.stringify(loggedInUser)}`);
        
        this.showAdd = !!loggedInUser.username;
      }
    );
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }
}
