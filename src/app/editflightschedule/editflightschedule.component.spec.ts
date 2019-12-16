import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditflightscheduleComponent } from './editflightschedule.component';

describe('EditflightscheduleComponent', () => {
  let component: EditflightscheduleComponent;
  let fixture: ComponentFixture<EditflightscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditflightscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditflightscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
