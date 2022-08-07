import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.component.html',
  styleUrls: ['./notice-add.component.css'],
})
export class NoticeAddComponent implements OnInit {
  public isError = false;
  public isSubmitting = false;
  public isAdded = false;

  constructor(private noticeService: NoticeService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isSubmitting = true;
    this.isAdded = false;

    const title = form.value.title;
    const description = form.value.description;
    const createdAt = form.value.createdAt.year + "-" + this.getTwoDigit(form.value.createdAt.month) + "-" + this.getTwoDigit(form.value.createdAt.day);

    this.noticeService.addNotice(title, description, createdAt).subscribe({
      next: (notice) => {
        this.isSubmitting = false;

        if (!!notice.id) {
          form.reset();
          this.isAdded = true;
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.isAdded = false;
        if (!!error) this.isError = true;
      },
    });
  }

  getTwoDigit(num: string) {
    return +num > 9 ? num : '0' + num;
  }
}
