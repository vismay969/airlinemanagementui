import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewflightmasterComponent } from './viewflightmaster.component';

describe('ViewflightmasterComponent', () => {
  let component: ViewflightmasterComponent;
  let fixture: ComponentFixture<ViewflightmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewflightmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewflightmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
