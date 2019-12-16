import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayflightdetailsComponent } from './displayflightdetails.component';

describe('DisplayflightdetailsComponent', () => {
  let component: DisplayflightdetailsComponent;
  let fixture: ComponentFixture<DisplayflightdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayflightdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayflightdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
