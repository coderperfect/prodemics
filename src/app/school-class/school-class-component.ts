import { Component, effect, signal } from '@angular/core';

import { LucidePlus } from '@lucide/angular';

import { SchoolClass } from './school-class';
import { SchoolClassService } from './school-class-service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-school-class-component',
  imports: [RouterOutlet, LucidePlus],
  templateUrl: './school-class-component.html',
  styleUrl: './school-class-component.scss',
})
export class SchoolClassComponent {
  readonly isChildRouteActive = signal(false);
  readonly classes = signal<SchoolClass[]>([]);
  
  constructor(
    public router: Router,
    private schoolClassService: SchoolClassService
  ) {
    effect(() => {
      this.schoolClassService.schoolClassRefresh();
      this.loadClasses();
    });
  }

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.schoolClassService.getAll().subscribe(classes => {this.classes.set(classes);});
  }

  addClass() {
    this.schoolClassService.create({
      id: null,
      name: '11-A',
      academicYear: 2026
    }).subscribe(() => {this.loadClasses();});
  }

  deleteClass(id: number) {
    this.schoolClassService.delete(id).subscribe(() => this.loadClasses());
  }
}
