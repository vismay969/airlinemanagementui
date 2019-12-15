import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookingInfo} from '../bookinginfo';
import {UserService} from '../user.service' ;
import {Router} from '@angular/router';
import {FlightList} from '../flightlist';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-bookinginfo',
  templateUrl: './bookinginfo.component.html',
  styleUrls: ['./bookinginfo.component.css']
})

export class BookinginfoComponent implements OnInit {
  @Input() flightSelected: FlightList;
  @Input() classSelected: string;
  @Input() passengerCount: number;
  @Output() flightBooked: EventEmitter<BookingInfo> =
    new EventEmitter<BookingInfo>();
  bookingInfo: BookingInfo = new class implements BookingInfo {
    booking_id: number;
    flightDate: string;
    cust_email: string;
    noOfPass: number;
    class_type: string;
    total_fare: number;
    total_seats: number;
    credit_card_info: string;
    statusFlag: string;
  };
  serviceCallError: HttpHeaders;
  userId: number;


  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.bookingInfo.cust_email = '';
    this.bookingInfo.credit_card_info = '';
  }


  onSubmit(value) {
    console.log( value);
    this.bookingInfo.booking_id = 0;     // zero for sequence
    this.bookingInfo.flightDate = this.flightSelected.dept_date;  // received as input
    this.bookingInfo.noOfPass = this.passengerCount;   // received as input
    this.bookingInfo.class_type = 'B';   // received as input
    this.bookingInfo.total_fare = this.passengerCount * this.flightSelected.fare_business;
    this.bookingInfo.total_seats = this.passengerCount;   // dupe
    this.bookingInfo.statusFlag = 'N';    // Default value;
    console.log(this.bookingInfo);
    // this.service.addBookingEntry(this.bookingInfo).subscribe(data => console.log(data));
    this.service.addBookingEntry(this.bookingInfo, this.userId, this.flightSelected.flight_sch_No)
      .subscribe( data => {
        console.log(data);
        this.flightBooked.emit(data);
        } ,
      (err) => {  this.captureError(err);
      }  );
  }

  captureError(error) {
    this.serviceCallError = error.error.message;
    console.log(' in captureError func  ---------------------------- ');
    console.log(this.serviceCallError);
  }

onCancel() {
    console.log('Cancelled');
    this.flightBooked.emit(null);
    // this.router.navigate(['/home']);
  }
}

