import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NoticeService } from '../notice.service';

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
    changeDetection: ChangeDetectionStrategy.Eager
})
export class NoticeDetailsComponent implements OnInit {
  public noticeId = 0;
  public notice: Notice = { id: 0, title: '', description: '', createdAt: '' };

  constructor(
    private route: ActivatedRoute,
    private noticeService: NoticeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.noticeId = +paramsMap.get('id')!;
    });

    this.noticeService.getNotice(this.noticeId).subscribe((noticesResponse) => {
      this.notice = noticesResponse;
    });
  }
}
