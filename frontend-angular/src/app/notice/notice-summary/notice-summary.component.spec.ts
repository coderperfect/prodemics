import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeSummaryComponent } from './notice-summary.component';

describe('NoticeSummaryComponent', () => {
  let component: NoticeSummaryComponent;
  let fixture: ComponentFixture<NoticeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
