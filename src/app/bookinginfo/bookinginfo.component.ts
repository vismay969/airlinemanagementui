import { Component, OnInit } from '@angular/core';
import {BookingInfo} from '../bookinginfo';
import {UserService} from '../user.service' ;
import {Router} from '@angular/router';

@Component({
  selector: 'app-bookinginfo',
  templateUrl: './bookinginfo.component.html',
  styleUrls: ['./bookinginfo.component.css']
})
export class BookinginfoComponent implements OnInit {
  bookingInfo: BookingInfo;
  userId = 1;
  flightSchNo = 16 ;
  fare = 1000;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
//        get data from parent
    this.bookingInfo.booking_id = 0;     // zero for sequence
    this.bookingInfo.flight_date = new Date(2019, 12, 13);   // received as input
    this.bookingInfo.noOfPass = 5;   // received as input
    this.bookingInfo.class_type = 'B';   // received as input
    this.bookingInfo.total_seats = 0;   // dupe
    this.bookingInfo.status_flag = 'N';    // Default value;

    console.log('in oninit -------------------------- '  );
    console.log(this.bookingInfo);

  }

  onSubmit(values) {
    console.log( values);

    this.bookingInfo = values;
    console.log(this.bookingInfo);

    this.bookingInfo.booking_id = 0;     // zero for sequence
    this.bookingInfo.flight_date = new Date(2019, 12, 13);   // received as input
    this.bookingInfo.noOfPass = 5;   // received as input
    this.bookingInfo.class_type = 'B';   // received as input
    this.bookingInfo.total_seats = 0;   // dupe
    this.bookingInfo.status_flag = 'N';    // Default value;
    console.log('intialise values ------------------------')

    this.bookingInfo.total_fare = this.bookingInfo.noOfPass * this.fare;

    console.log('fare added ' );
    console.log(this.bookingInfo);
    this.service.addBookingEntry(this.bookingInfo).subscribe(data => console.log(data));



  }
}

