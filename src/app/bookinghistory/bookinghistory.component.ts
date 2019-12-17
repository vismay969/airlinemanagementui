import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BookingInfo} from '../bookinginfo';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {UserDetails} from '../userdetail';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})

export class BookinghistoryComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
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
  selectedTicket: BookingInfo;
  userId: string;
  idxpos = 0;
  p: number;
  updateSuccess: BookingInfo;
  template: TemplateRef<any>;
  serviceCallError: string;
  deleteError = false;
  successFlag = false;
  // dateFormat = require('dateformat');
  now = new Date();
  today = this.now.toISOString();
  // dateFormat(now, "mmm-dd-yyyy");
  constructor(private service: UserService, private router: Router, private modalService: BsModalService) {
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


  viewTicket(obj) {
    this.selectedTicket = obj;
    console.log(this.selectedTicket);
    this.router.navigate(['/flightticket', this.selectedTicket]);
    console.log('not routing');
  }



  //   cancelBookingEntry(obj, template: TemplateRef<any>) {
  //
  //
  //     this.bookingentry = obj;
  //     this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  //     // this.service.cancelBookingEntry(this.bookingentry).subscribe(data => {
  //   //    this.idxpos = this.bookingList.indexOf(obj);
  // // openModal(template: TemplateRef<any>) {
  // //   this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  // // }

  confirm(): void {
    this.message = 'Confirmed!';
    console.log(this.bookingentry);
    this.service.cancelBookingEntry(this.bookingentry).subscribe(data => {
        this.updateSuccess = data;
        this.successFlag = true;
        this.service.findAllBookingInfobyUserId(this.userId).subscribe(newData => this.bookingList = newData);
      },
      (err) => {
        console.log(err);
        this.captureError(err);
      });
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  cancelBookingEntry(obj, template: TemplateRef<any>) {
    this.bookingentry = obj;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    //   this.idxpos = this.bookingList.indexOf(obj);
    //   this.bookingentry = obj;
    //   this.service.cancelBookingEntry(this.bookingentry).subscribe(data => {
    //       this.updateSuccess = data;
    //       this.successFlag = true;
    //       this.service.findAllBookingInfobyUserId(this.userId).subscribe(newData => this.bookingList = newData); },
    //       (err) => {  this.captureError(err); } );
  }

  private captureError(err: any) {
    this.serviceCallError = err.error.message;
    console.log(' in captureError func  ---------------------------- ');
    this.deleteError = true;
  }
}
