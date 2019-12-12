import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {AirportMaster} from '../airport-master';

@Component({
  selector: 'app-searchflight',
  templateUrl: './searchflight.component.html',
  styleUrls: ['./searchflight.component.css']
})

export class SearchflightComponent implements OnInit {
  airportList: AirportMaster[];
  searchflightForm: FormGroup;
  formConfig1: any[] = [
  {name: 'dept_abbr', type: 'text', label: 'Departure Airport', text : 'leftbox',
    errorMsg: 'Departure Airport Required',
    constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
  {name: 'arr_abbr', type: 'text', label: 'Arrival Airport', text : 'rightbox',
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
    {name: 'noofseats', type: 'number', label: 'No. of Seats', text : 'rightbox',
      errorMsg: 'No. of Seats Required',
      constraint: [Validators.required, Validators.max(5), Validators.min(1)] },
  ];
private loginStatus = 'invalid user';
Airports = ['BOM', 'AHD', 'CHN', 'DEL', 'HYD'];
FlightClass = ['Business', 'Economy'];
PassengerCount = [1, 2, 3, 4, 5];

constructor(private fb: FormBuilder, private router: Router, private service: UserService) { }

ngOnInit() {
  this.service.findAllAirports('airport').subscribe(data => this.airportList = data);
  this.searchflightForm = this.createForm();
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
  const noofseats = this.searchflightForm.get('noofseats').value;
  // this.router.navigate(['/showcustomer']);
  }

}


