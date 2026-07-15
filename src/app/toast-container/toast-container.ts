import { Component, ViewEncapsulation } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [NgbToast],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
  encapsulation: ViewEncapsulation.None
})
export class ToastContainer {
  constructor(public toastService: ToastService) {}
}
