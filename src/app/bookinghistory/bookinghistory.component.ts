import {Component, Input, OnInit} from '@angular/core';
import {BookingInfo} from '../bookinginfo';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {UserDetails} from '../userdetail';


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
    statusFlag: string;

  };


  bookingList: BookingInfo[];
  userId: string;
  idxpos = 0;
  p: number;
  updateSuccess: BookingInfo;

  serviceCallError: string;
  deleteError = false;
  successFlag = false ;
  // dateFormat = require('dateformat');
  now = new Date();
  // dateFormat(now, "mmm-dd-yyyy");
  constructor(private service: UserService, private router: Router) {
  }

  ngOnInit() {
    const loggedStatus = sessionStorage.getItem('userLogged');
    console.log(loggedStatus);
    if (loggedStatus !== 'yes') {
      this.router.navigate(['/login'], { queryParams: { returnUrl: ['/history'] }});
    } else {
      this.userId = sessionStorage.getItem('loggedUserId');
      console.log(this.userId);
      this.service.findAllBookingInfobyUserId(this.userId).subscribe(data => this.bookingList = data);
      console.log(this.now);
      console.log(this.bookingList);
    }

  }


  cancelBookingEntry(obj) {

      this.idxpos = this.bookingList.indexOf(obj);
      this.bookingentry = obj;
      this.service.cancelBookingEntry(this.bookingentry).subscribe(data => {
        this.updateSuccess = data;
        this.successFlag = true;
        this.service.findAllBookingInfobyUserId(this.userId).subscribe(newData => this.bookingList = newData); },
        (err) => {  this.captureError(err); } );
  }

  private captureError(err: any) {
    this.serviceCallError = err.error.message;
    console.log(' in captureError func  ---------------------------- ');
    this.deleteError = true;
  }

}
