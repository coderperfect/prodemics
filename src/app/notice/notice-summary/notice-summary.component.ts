import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Notice {
  id: number,
  title: string;
  description: string;
  createdAt: string;
}

@Component({
  selector: 'app-notice-summary',
  templateUrl: './notice-summary.component.html',
  styleUrls: ['./notice-summary.component.css']
})
export class NoticeSummaryComponent implements OnInit {
  @Input('notice') public noticeData: Notice = {id: 0, title: '', description: '', createdAt: ''};
  @Output('noticeClick') noticeClickEvent = new EventEmitter<{id: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  onNoticeClick() {
    this.noticeClickEvent.emit({id: this.noticeData.id});
  }
}
