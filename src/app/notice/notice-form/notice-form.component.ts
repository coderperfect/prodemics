import { Component, OnInit, ViewChild, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgForm, NgModel, FormsModule } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap/alert';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';
import { ToastService } from '../../toast-container/toast.service';

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
  
  // Form values
  readonly title = signal('');
  readonly noticeDate = signal<NgbDateStruct | null>(null);
  readonly description = signal('');

  public isEditMode = false;
  public noticeId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticeService: NoticeService,
    private toastService: ToastService
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

            const date = new Date(notice.noticeDate);
            this.noticeDate.set({
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            });

            this.description.set(notice.description);
          }
        });
    }
  }

  onSubmit(form: NgForm) {
    this.isSubmitting.set(true);

    const title = this.title();
    const noticeDate = (
      this.noticeDate()!.year + "-" + this.getTwoDigit(this.noticeDate()!.month) + "-" 
      + this.getTwoDigit(this.noticeDate()!.day)
    );
    const description = this.description();

    const request = (this.isEditMode 
      ? this.noticeService.updateNotice(this.noticeId, title, noticeDate, description)
      : this.noticeService.addNotice(title, noticeDate, description)
    );

    request.subscribe({
      next: (notice) => {
        this.isSubmitting.set(false);

        if (!!notice.id) {
          if (!this.isEditMode) form.reset();

          if (!this.isEditMode) this.toastService.success('Notice published successfully');
          else this.toastService.success('Notice updated successfully');
          
          this.noticeService.noticeRefresh.update(value => value + 1);

          if (!this.isEditMode) this.router.navigate(['/notice']);
          else this.router.navigate(['/notice', this.noticeId]);
        }
      },
      error: (error) => {
        this.isSubmitting.set(false);

        if (!!error) this.isError.set(true);
      }
    });
  }

  getTwoDigit(num: number) {
    return num > 9 ? num : '0' + num;
  }
}
