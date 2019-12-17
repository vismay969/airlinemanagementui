import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {AirportMaster} from '../airportmaster';
import {Observable} from 'rxjs';
import {FlightList} from '../flightlist';
import {BookingInfo} from '../bookinginfo';

@Component({
  selector: 'app-searchflight',
  templateUrl: './searchflight.component.html',
  styleUrls: ['./searchflight.component.css']
})

export class SearchflightComponent implements OnInit {
  flightList: FlightList[];
  selectedFlight: FlightList;
  selectedTicket: BookingInfo;
  inputFlight: any;
  psgClass: string;
  seatsBus: number ;
  seatsFirst: number;
  displayFlightList = false;
  bookFlight = false;
  airportList: AirportMaster[];
  searchflightForm: FormGroup;
  formConfig1: any[] = [
  {name: 'dept_abbr', type: 'text', label: 'Departure Airport', text : 'leftbox',
    errorMsg: 'Departure Airport Required',
    constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
  {name: 'arr_abbr', type: 'text', label: 'Arrival Airport', text : 'leftbox',
    errorMsg: 'Arrival Airport Required',
    constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
  ];
  formConfig2: any[] = [
    {name: 'dept_date', type: 'date', label: 'Departure Date', text : 'leftbox',
      errorMsg: 'Departure Date Required',
      constraint: Validators.required},
  ];
  formConfig3: any[] = [
    {name: 'class', type: 'text', label: 'Class Type', text : 'leftbox',
      errorMsg: 'Flight Class Required',
      constraint: [Validators.required, Validators.minLength(1), Validators.maxLength(10)] },
  ];
  formConfig4: any[] = [
    {name: 'noofseats', type: 'number', label: 'No. of Seats', text : 'leftbox',
      errorMsg: 'No. of Seats Required',
      constraint: [Validators.required, Validators.max(5), Validators.min(1)] },
  ];
private loginStatus = 'invalid user';
FlightClass = ['Business', 'First'];
PassengerCount = [1, 2, 3, 4, 5, 6];

  constructor(private fb: FormBuilder, private router: Router, private service: UserService, private route: ActivatedRoute) {
  }

ngOnInit() {
  this.service.findAllAirports('airport').subscribe(data => this.airportList = data);
  this.searchflightForm = this.createForm();
  this.route.params.subscribe(params => {
    console.log(params);
    this.inputFlight = params;
    this.selectedFlight = this.inputFlight;
  });
  console.log(this.selectedFlight);
  if (this.selectedFlight.flight_sch_No > 1) {
    this.onReceipt(this.selectedFlight);
  }
  // console.log(this.selectedFlight);
}

createForm(): FormGroup {
  const group = this.fb.group({});
  this.formConfig1.forEach(eachConfig => {
    group.addControl(eachConfig.name, new FormControl(
      '', {validators: eachConfig.constraint}));
  });
  this.formConfig2.forEach(eachConfig => {
    group.addControl(eachConfig.name, new FormControl(
      '', {validators: eachConfig.constraint}));
  });
  this.formConfig3.forEach(eachConfig => {
    group.addControl(eachConfig.name, new FormControl(
      '', {validators: eachConfig.constraint}));
  });
  this.formConfig4.forEach(eachConfig => {
    group.addControl(eachConfig.name, new FormControl(
      '', {validators: eachConfig.constraint}));
  });

  // group.setValidators(validatePassword);
  return group;
}

onSubmit() {
  console.log(this.searchflightForm.value);
  console.log(this.searchflightForm.get('dept_abbr').value);
  console.log(this.searchflightForm.get('arr_abbr').value);
  console.log(this.searchflightForm.get('dept_date').value);
  console.log(this.searchflightForm.get('class').value);
  console.log(this.searchflightForm.get('noofseats').value);
  const depAbbr = this.searchflightForm.get('dept_abbr').value;
  const arrAbbr = this.searchflightForm.get('arr_abbr').value;
  const depDate = this.searchflightForm.get('dept_date').value;
  this.psgClass = this.searchflightForm.get('class').value;
  if (this.psgClass === 'Business') {
    this.seatsBus = this.searchflightForm.get('noofseats').value;
    this.seatsFirst = 0;
  } else {
    this.seatsBus = 0;
    this.seatsFirst = this.searchflightForm.get('noofseats').value;
  }
  console.log(this.seatsBus);
  console.log(this.seatsFirst);
  console.log(arrAbbr);
  console.log(depAbbr);
  console.log(depDate);
  this.service.searchUserFlights(this.seatsBus, this.seatsFirst, arrAbbr, depAbbr, depDate)
    .subscribe(data => {
      this.flightList = data;
      this.displayFlightList = true;
      console.log(this.flightList);
    });
}

  onReceipt(val) {
    console.log(val);
    this.selectedFlight = val;
    const loggedStatus = sessionStorage.getItem('userLogged');
    console.log(loggedStatus);
    if (loggedStatus !== 'yes') {
      this.router.navigate(['/login', this.selectedFlight], {queryParams: {returnUrl: ['/home']}});
      this.displayFlightList = false;
      this.bookFlight = true;
    } else {
      this.displayFlightList = false;
      this.bookFlight = true;
    }
  }

  onReturn(val) {
    console.log(val);
    this.selectedTicket = val;
    console.log(this.selectedTicket);
    this.router.navigate(['/flightticket', this.selectedTicket]);
    console.log('not routing');
    // this.displayFlightList = false;
    // this.bookFlight = false;
    // this.searchflightForm.reset();
  }
}
