import { Component, OnInit } from '@angular/core';
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
})
export class NoticeDetailsComponent implements OnInit {
  public noticeId = 0;
  public notice: Notice = { id: 0, title: '', description: '', createdAt: '' };

  constructor(
    private route: ActivatedRoute,
    private noticeService: NoticeService
  ) {}

  ngOnInit(): void {
    this.noticeService.getNotice().subscribe((notices) => {
      this.notice = notices
        .filter((notice) => notice.id === this.noticeId)
        .at(0)!;
    });

    this.route.paramMap.subscribe((paramsMap) => {
      this.noticeId = +paramsMap.get('id')!;
    });
  }
}
