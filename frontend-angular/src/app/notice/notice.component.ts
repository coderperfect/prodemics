import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  public showAdd = true;
  public notices = [
    {
      title: "Mid Term Exam",
      details: "Mid term exam going to start from 1st July",
      date: "04/06/2022"
    },
    {
      title: "Summer Vacation",
      details: "Summer Vacation going to start from 1st August",
      date: "09/06/2022"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
