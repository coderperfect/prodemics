import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';
import { NoticeService } from './notice.service';
import { NoticeSummaryComponent } from './notice-summary/notice-summary.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap/pagination';

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
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NoticeSummaryComponent, NgbPagination, RouterOutlet]
})
export class NoticeComponent implements OnInit, OnDestroy {
  readonly showAdd = signal(false);
  readonly notices = signal<Notice[]>([]);
  readonly pageSize = signal(5);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);

  private loggedInUserSub = new Subscription();

  constructor(
    private loginService: LoginService,
    private noticeService: NoticeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserSub = this.loginService.loggedInUser.subscribe(
      (loggedInUser) => {
        this.showAdd.set(!!loggedInUser.authorities.toString().includes('admin'));
      }
    );

    this.noticeService.getNotices().subscribe((noticesResponse) => {
      this.notices.set(noticesResponse.notices);
      this.currentPage.set(noticesResponse.currentPage);
      this.totalPages.set(noticesResponse.totalPages);
    });
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }

  onNoticeSummaryClick(event: {id: number}) {
    this.router.navigate([`/notice/${event.id}`]);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page)

    this.noticeService.getNotices(page).subscribe((noticesResponse) => {
      this.notices.set(noticesResponse.notices);
      this.currentPage.set(noticesResponse.currentPage);
      this.totalPages.set(noticesResponse.totalPages);
    });
  }
}
