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
  seatsCount: number;
  displayFlightList = false;
  bookFlight = false;
  returnParams: string[];
  airportList: AirportMaster[];

  // returnUrl: string;
  now = new Date();
  month = this.now.getMonth() + 1;
  today = this.now.getFullYear().toString() + '-' + this.month.toString() + '-' + this.now.getUTCDate().toString();
  minDate = this.today;
  maxDate = '2020-12-31';

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
      constraint: [Validators.required, Validators.max(6), Validators.min(1)] },
  ];
private loginStatus = 'invalid user';
FlightClass = ['Business', 'First'];
PassengerCount = [1, 2, 3, 4, 5, 6];

constructor(private fb: FormBuilder, private router: Router, private service: UserService, private route: ActivatedRoute) { }

ngOnInit() {
  console.log(this.router.url);
  console.log('In Init');
  this.service.findAllAirports('airport').subscribe(data => this.airportList = data);
  this.searchflightForm = this.createForm();
  // this.searchflightForm.reset();
  console.log(this.route.snapshot.queryParams.returnUrl);
  this.returnParams = this.route.snapshot.queryParams.returnUrl || '';
  if (this.returnParams.length === 2) {
    console.log('In Params');
    this.seatsCount = (Number(this.returnParams[1]) || 0);
    this.psgClass = this.returnParams[0] || '';
  }
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
    this.seatsCount = this.seatsBus;
    this.seatsFirst = 0;
  } else {
    this.seatsBus = 0;
    this.seatsFirst = this.searchflightForm.get('noofseats').value;
    this.seatsCount = this.seatsFirst;

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
      console.log('redirect to login');
      this.router.navigate(['/login', this.selectedFlight],
        { queryParams: { returnUrl: [this.router.url, this.psgClass, this.seatsCount] }});
      this.displayFlightList = false;
      this.bookFlight = true;
    } else {
      console.log('redirect to book');
      this.displayFlightList = false;
      this.bookFlight = true;
    }
  }

  onReturn(val) {
    console.log(val);
    this.selectedTicket = val;
    console.log(this.selectedTicket);
    console.log(this.psgClass);
    console.log(this.seatsBus);
    this.router.navigate(['/flightticket', this.selectedTicket]);
    console.log('not routing');
    // this.displayFlightList = false;
    // this.bookFlight = false;
    // this.searchflightForm.reset();
  }
}
