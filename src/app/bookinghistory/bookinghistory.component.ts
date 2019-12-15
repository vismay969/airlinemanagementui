import {Component, Input, OnInit} from '@angular/core';
import {BookingInfo} from '../bookinginfo';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Userdetail} from '../userdetail';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})

export class BookinghistoryComponent implements OnInit {

  bookingentry: BookingInfo = new class implements BookingInfo {

    booking_id: number;
    flightDate: any;
    cust_email: string;
    noOfPass: number;
    class_type: string;
    total_fare: number;
    total_seats: number;
    credit_card_info: string;
    status_flag: string;

  };

  bookingList: BookingInfo[];
  userId = 1;
  idxpos = 0;
  p: number;


  constructor(private service: UserService, private router: Router) {
  }

  ngOnInit() {
    this.service.findAllBookingInfobyUserId(this.userId).subscribe(data => this.bookingList = data);
  }


/*  cancelBookingEntry(obj) {
    this.idxpos = this.bookingList.indexOf(obj);
    this.bookingentry = obj;
    this.service.cancelBookingEntry(this.bookingentry).subscribe(data => this.bookingList[this.idxpos] = data);

  }*/
}


