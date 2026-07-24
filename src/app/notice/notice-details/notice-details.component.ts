import { Component, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NoticeService } from '../notice.service';
import { DatePipe } from '@angular/common';
import { LucideArrowLeft, LucideMegaphone } from '@lucide/angular';
import { LoginService } from '../../login/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../toast-container/toast.service';

interface Notice {
  id: number,
  title: string,
  noticeDate: string,
  description: string
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
  readonly notice = signal<Notice>({ id: 0, title: '', noticeDate: '', description: '' });

  readonly isAdmin = computed(
    () => this.loginService.loggedInUser.value.authorities.toString().includes('admin')
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticeService: NoticeService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.noticeId.set(+paramsMap.get('id')!);
    });

    this.noticeService.getNotice(this.noticeId()).subscribe((noticesResponse) => {
      this.notice.set(noticesResponse);
    });
  }

  onEdit() {
    this.router.navigate(
      ['/notice', this.notice().id, 'edit']
    );
  }

  openDeleteModal(content: any) {
    this.modalService.open(content, {
      centered: true
    });
  }

  confirmDelete(modal: any) {
    this.noticeService.deleteNotice(this.notice().id)
      .subscribe(() => {
        modal.close();

        this.noticeService.noticeRefresh.update(
          value => value + 1
        );

        this.toastService.success("Notice deleted successfully")

        this.router.navigate(['/notice']);
      });
  }
}
