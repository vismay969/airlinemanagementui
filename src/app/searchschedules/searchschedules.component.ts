import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {AirportMaster} from '../airportmaster';
import {FlightList} from '../flightlist';
import {AdminService} from "../admin.service";


@Component({
  selector: 'app-searchschedules',
  templateUrl: './searchschedules.component.html',
  styleUrls: ['./searchschedules.component.css']
})
export class SearchschedulesComponent implements OnInit {

  flightList: FlightList[];
  airportList: AirportMaster[];
  selectedFlight: FlightList;
  seatsFirst = 0;
  seatsBus = 0;
  adminsearchscheduleForm: FormGroup;

  formConfig1: any[] = [
    {
      name: 'dept_abbr', type: 'text', label: 'Departure Airport', text: 'leftbox',
      errorMsg: 'Departure Airport Required',
      constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
    {
      name: 'arr_abbr', type: 'text', label: 'Arrival Airport', text: 'leftbox',
      errorMsg: 'Arrival Airport Required',
      constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
  ];
  formConfig2: any[] = [
    {
      name: 'dept_date', type: 'date', label: 'Departure Date', text: 'leftbox',
      errorMsg: 'Departure Date Required',
      constraint: Validators.required
    },
  ];

  displayFlightList = false;
   editFlight =  false;


  constructor(private fb: FormBuilder, private router: Router, private service: AdminService) {
  }

  ngOnInit() {
    this.service.findAllAirports('airport').subscribe(data => this.airportList = data );
    this.adminsearchscheduleForm = this.createForm();
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
    return group;
  }


  onSubmit() {

    const depAbbr = this.adminsearchscheduleForm.get('dept_abbr').value;
    const arrAbbr = this.adminsearchscheduleForm.get('arr_abbr').value;
    const depDate = this.adminsearchscheduleForm.get('dept_date').value;

      // this.router.navigate(['/showcustomer']);
    this.service.searchAdminFlights(this.seatsBus, this.seatsFirst, depAbbr, arrAbbr, depDate)
        .subscribe(data => {
          this.flightList = data;
          this.displayFlightList = true;
        });

    console.log(this.flightList);
    }

  onReceipt(val) {
    console.log(val);
    this.selectedFlight = val;
    this.displayFlightList = false;
    this.editFlight = true;
  }

  onReturn(val) {
    console.log(val);
    this.displayFlightList = true;
    this.editFlight = false;
    this.adminsearchscheduleForm.reset();

  }
}
