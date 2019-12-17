import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookingInfo} from '../bookinginfo';

@Component({
  selector: 'app-flightticket',
  templateUrl: './flightticket.component.html',
  styleUrls: ['./flightticket.component.css']
})
export class FlightticketComponent implements OnInit {
  flightticket: BookingInfo;
  selectedticket: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.selectedticket = params;
      this.flightticket = this.selectedticket;
    });
    console.log(this.flightticket);
  }

  onSubmit() {
    // add Email Service
  }

}
