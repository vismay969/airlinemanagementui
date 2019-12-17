import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlightList} from '../flightlist';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Flightdetail} from '../flightdetail';
import {AdminService} from '../admin.service';


@Component({
  selector: 'app-editflightschedule',
  templateUrl: './editflightschedule.component.html',
  styleUrls: ['./editflightschedule.component.css']
})

export class EditflightscheduleComponent implements OnInit {
  @Input() flightSelectedObj: FlightList;
  @Input() classSelected: string;
  @Input() passengerCount: number;
  @Output() succcessFlag = new EventEmitter();
  flightInfo: Flightdetail = new class implements Flightdetail {
    flight_sch_No: number;
    dept_date: string;
    dept_time: string;
    arr_date: string;
    arr_time: string;
    fare_first: number;
    seats_remaining_first: number;
    fare_business: number;
    seats_remaining_business: number;
    status_flag: string;
  };
  serviceCallError: HttpHeaders;
  userId: number;


  constructor(private service: AdminService, private router: Router) {
  }

  ngOnInit() {
    // this.flightInfo.cust_email = '';
    // this.flightInfo.credit_card_info = '';

    this.flightInfo.dept_date = '';
    this.flightInfo.dept_time = '';
    this.flightInfo.arr_date = '' ;
    this.flightInfo.arr_time = '';
    this.flightInfo.fare_business = 0;
    this.flightInfo.fare_first = 0;

  }


  onSubmit(value) {
    console.log(value);
    this.flightInfo.dept_date = this.flightSelectedObj.dept_date;
    this.flightInfo.dept_time = this.flightSelectedObj.dept_time;
    this.flightInfo.arr_date = this.flightSelectedObj.arr_date ;
    this.flightInfo.arr_time = this.flightSelectedObj.arr_time;
    this.flightInfo.fare_business = this.flightSelectedObj.fare_business;
    this.flightInfo.fare_first = this.flightSelectedObj.fare_first;
    this.flightInfo.flight_sch_No = this.flightSelectedObj.flight_sch_No; // update
    this.flightInfo.seats_remaining_business = this.flightSelectedObj.noOfSeats_business;
    this.flightInfo.seats_remaining_first = this.flightSelectedObj.seats_remaining_first;
    this.flightInfo.status_flag = this.flightSelectedObj.status_flag;
    console.log(this.flightInfo);
    // this.service.addBookingEntry(this.flightInfo).subscribe(data => console.log(data));
    this.service.editFlightDetails(this.flightInfo, this.flightSelectedObj.flightNo)
      .subscribe(data => {
        console.log(data);
        this.succcessFlag.emit(true);
      }, (err) => {  this.captureError(err);
                     this.succcessFlag.emit(false);
        } );
  }

  captureError(error) {
    this.serviceCallError = error.error.message;
    console.log(' in captureError func  ---------------------------- ');
    console.log(this.serviceCallError);
  }

  onCancel() {
    console.log('Cancelled');

    // this.router.navigate(['/home']);
  }
}
