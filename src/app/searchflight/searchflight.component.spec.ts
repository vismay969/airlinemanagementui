import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchflightComponent } from './searchflight.component';

describe('SearchflightComponent', () => {
  let component: SearchflightComponent;
  let fixture: ComponentFixture<SearchflightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchflightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
