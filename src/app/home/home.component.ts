import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import {LucideBookOpen, LucideCalendarDays, LucideClipboardCheck, LucideMegaphone} from '@lucide/angular';

import { DashboardCard } from '../shared/dashboard-card/dashboard-card';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      RouterLink, DashboardCard, LucideMegaphone, LucideClipboardCheck, LucideCalendarDays,
      LucideBookOpen
    ]
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
