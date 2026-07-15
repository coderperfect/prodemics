import { Component, OnInit, ViewChild, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgForm, NgModel, FormsModule } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap/alert';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';

@Component({
    selector: 'app-notice-add',
    templateUrl: './notice-form.component.html',
    styleUrls: ['./notice-form.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, NgbAlert, NgbInputDatepicker, RouterLink, LucideArrowLeft]
})
export class NoticeFormComponent implements OnInit {
  readonly isError = signal(false);
  readonly isSubmitting = signal(false);
  readonly isAdded = signal(false);
  
  // Form values
  readonly title = signal('');
  readonly description = signal('');
  readonly createdAt = signal<NgbDateStruct | null>(null);

  public isEditMode = false;
  public noticeId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticeService: NoticeService
  ) {}

  get backLink() {
    return this.isEditMode ? ['/notice', this.noticeId] : ['/notice'];
  }

  get backText() {
    return this.isEditMode ? 'Back to Notice' : 'Back to Notices';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
        this.isEditMode = true;
        this.noticeId = Number(id);

        this.noticeService.getNotice(this.noticeId).subscribe({
          next: (notice) => {
            this.title.set(notice.title);
            this.description.set(notice.description);

            const date = new Date(notice.createdAt);
            this.createdAt.set({
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            });
          }
        });
    }
  }

  onSubmit(form: NgForm) {
    this.isSubmitting.set(true);
    this.isAdded.set(false);

    const title = this.title();
    const description = this.description();
    const createdAt = (
      this.createdAt()!.year + "-" + this.getTwoDigit(this.createdAt()!.month) + "-" 
      + this.getTwoDigit(this.createdAt()!.day)
    );

    const request = (this.isEditMode 
      ? this.noticeService.updateNotice(this.noticeId, title, description, createdAt)
      : this.noticeService.addNotice(title, description, createdAt)
    );

    request.subscribe({
      next: (notice) => {
        this.isSubmitting.set(false);

        if (!!notice.id) {
          if (!this.isEditMode) form.reset();

          this.isAdded.set(true);
          this.noticeService.noticeRefresh.update(value => value + 1);

          if (!this.isEditMode) this.router.navigate(['/notice']);
          else this.router.navigate(['/notice', this.noticeId]);
        }
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.isAdded.set(false);

        if (!!error) this.isError.set(true);
      }
    });
  }

  getTwoDigit(num: number) {
    return num > 9 ? num : '0' + num;
  }
}
