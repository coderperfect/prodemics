import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassComponent } from './school-class-component';

describe('SchoolClassComponent', () => {
  let component: SchoolClassComponent;
  let fixture: ComponentFixture<SchoolClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolClassComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
