import { Component, signal } from '@angular/core';
import { SchoolClass } from './school-class';
import { SchoolClassService } from './school-class-service';

@Component({
  selector: 'app-school-class-component',
  imports: [],
  templateUrl: './school-class-component.html',
  styleUrl: './school-class-component.scss',
})
export class SchoolClassComponent {
  readonly classes = signal<SchoolClass[]>([]);
  
  constructor(
    private schoolClassService: SchoolClassService
  ) {}

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
      academicYear: 2026,
      createdAt: ''
    }).subscribe(() => {this.loadClasses();});
  }

  deleteClass(id: number) {
    this.schoolClassService.delete(id).subscribe(() => this.loadClasses());
  }
}
