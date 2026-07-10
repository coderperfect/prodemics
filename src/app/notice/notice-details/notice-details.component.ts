import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { NoticeService } from '../notice.service';
import { DatePipe } from '@angular/common';
import { LucideArrowLeft, LucideMegaphone } from '@lucide/angular';

interface Notice {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

@Component({
    selector: 'app-notice-details',
    templateUrl: './notice-details.component.html',
    styleUrls: ['./notice-details.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DatePipe, RouterLink, LucideMegaphone, LucideArrowLeft]
})
export class NoticeDetailsComponent implements OnInit {
  readonly noticeId = signal(0);
  readonly notice = signal<Notice>({ id: 0, title: '', description: '', createdAt: '' });

  constructor(
    private route: ActivatedRoute,
    private noticeService: NoticeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.noticeId.set(+paramsMap.get('id')!);
    });

    this.noticeService.getNotice(this.noticeId()).subscribe((noticesResponse) => {
      this.notice.set(noticesResponse);
    });
  }
}
