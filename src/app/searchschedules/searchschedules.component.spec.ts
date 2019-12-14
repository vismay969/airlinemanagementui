import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchschedulesComponent } from './searchschedules.component';

describe('SearchschedulesComponent', () => {
  let component: SearchschedulesComponent;
  let fixture: ComponentFixture<SearchschedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchschedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchschedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
