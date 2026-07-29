import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LucideArrowLeft } from '@lucide/angular';

import { SchoolClassService } from '../school-class-service';
import { SchoolClass } from '../school-class';
import { ToastService } from '../../toast-container/toast.service';

@Component({
  selector: 'app-school-class-form-component',
  imports: [FormsModule, NgbAlert, RouterLink, LucideArrowLeft],
  templateUrl: './school-class-form-component.html',
  styleUrl: './school-class-form-component.scss',
})
export class SchoolClassFormComponent {
  readonly isError = signal(false);
  readonly isSubmitting = signal(false);
  
  // Used for both add and edit mode
  readonly schoolClass = signal<SchoolClass>({id: null, name: '', academicYear: null});

  public isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schoolClassService: SchoolClassService,
    private toastService: ToastService
  ) {}

  get backLink() {
    return this.isEditMode ? ['/classes', this.schoolClass().id] : ['/classes'];
  }

  get backText() {
    return this.isEditMode ? 'Back to Class' : 'Back to Classes';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.schoolClass.update((schoolClass) => ({ ...schoolClass, id: Number(id) }));

      this.schoolClassService.get(this.schoolClass().id!).subscribe({
        next: (schoolClass) => {
          this.schoolClass.set(schoolClass);
        }
      });
    }
  }

  onSubmit(form: NgForm) {
    this.isSubmitting.set(true);

    const request = (this.isEditMode 
      ? this.schoolClassService.update(this.schoolClass().id!, this.schoolClass()!)
      : this.schoolClassService.create(this.schoolClass()!)
    );

    request.subscribe({
      next: (notice) => {
        this.isSubmitting.set(false);

        if (!!notice.id) {
          if (!this.isEditMode) form.reset();

          if (!this.isEditMode) this.toastService.success('Class created successfully');
          else this.toastService.success('Class updated successfully');
          
          this.schoolClassService.schoolClassRefresh.update(value => value + 1);

          if (!this.isEditMode) this.router.navigate(['/classes']);
          else this.router.navigate(['/classes', this.schoolClass().id]);
        }
      },
      error: (error) => {
        this.isSubmitting.set(false);

        if (!!error) this.isError.set(true);
      }
    });
  }
}
