import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightticketComponent } from './flightticket.component';

describe('FlightticketComponent', () => {
  let component: FlightticketComponent;
  let fixture: ComponentFixture<FlightticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
