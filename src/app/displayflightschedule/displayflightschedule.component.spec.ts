import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayflightscheduleComponent } from './displayflightschedule.component';

describe('DisplayflightscheduleComponent', () => {
  let component: DisplayflightscheduleComponent;
  let fixture: ComponentFixture<DisplayflightscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayflightscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayflightscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
