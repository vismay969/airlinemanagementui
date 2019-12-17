import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportinfoComponent } from './airportinfo.component';

describe('AirportinfoComponent', () => {
  let component: AirportinfoComponent;
  let fixture: ComponentFixture<AirportinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
