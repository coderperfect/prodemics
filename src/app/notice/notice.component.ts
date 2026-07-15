import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';
import { NoticeService } from './notice.service';
import { NoticeSummaryComponent } from './notice-summary/notice-summary.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap/pagination';
import { LucidePlus } from '@lucide/angular';

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
    imports: [NoticeSummaryComponent, NgbPagination, RouterOutlet, LucidePlus]
})
export class NoticeComponent implements OnInit, OnDestroy {
  readonly isChildRouteActive = signal(false);
  
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
  ) {
    effect(() => {
      this.noticeService.noticeRefresh();
      this.loadNotices();
    });
  }

  private loadNotices(page = this.currentPage()) {
    this.noticeService.getNotices(page).subscribe((response) => {
      this.notices.set(response.notices);
      this.currentPage.set(response.currentPage);
      this.totalPages.set(response.totalPages);
    });
  }

  ngOnInit(): void {
    this.loggedInUserSub = this.loginService.loggedInUser.subscribe(
      (loggedInUser) => {
        this.showAdd.set(!!loggedInUser.authorities.toString().includes('admin'));
      }
    );
  }

  ngOnDestroy(): void {
    this.loggedInUserSub.unsubscribe();
  }

  onNoticeSummaryClick(event: {id: number}) {
    this.router.navigate([`/notice/${event.id}`]);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);

    this.loadNotices(page);
  }
}
