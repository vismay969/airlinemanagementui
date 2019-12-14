import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {AirportMaster} from '../airportmaster';


@Component({
  selector: 'app-searchschedules',
  templateUrl: './searchschedules.component.html',
  styleUrls: ['./searchschedules.component.css']
})
export class SearchschedulesComponent implements OnInit {

  airportList: AirportMaster[];

  adminsearchscheduleForm: FormGroup;
  dataconfig: any[] = [
    {name: 'dept_abbr', type: 'text', label: 'Departure Airport',
      errorMsg: 'Departure Airport Required',
      constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
    {name: 'arr_abbr', type: 'text', label: 'Arrival Airport',
      errorMsg: 'Arrival Airport Required',
      constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
  ];

  dataconfig1: any[] = [
    {
      name: 'airline', type: 'text', label: 'Airline',
      errorMsg: 'Please select the airline to search',
      constraint: [Validators.required]
    },
  ];

  dataconfig2: any[] = [
    {
      name: 'dept_date', type: 'date', label: 'Departure Date',
      errorMsg: 'Departure Date Required',
      constraint: Validators.required
    },
  ];

  constructor(private fb: FormBuilder, private router: Router, private service: UserService) {
  }

  ngOnInit() {
    this.service.findAllAirports('airport').subscribe(data => this.airportList = data );
    this.adminsearchscheduleForm = this.createForm();
  }

  createForm(): FormGroup {
    const group = this.fb.group({});
    this.dataconfig.forEach(eachConfig => {
      group.addControl(eachConfig.name, new FormControl(
        '', {validators: eachConfig.constraint}));
    });
    this.dataconfig1.forEach(eachConfig => {
      group.addControl(eachConfig.name, new FormControl(
        '', {validators: eachConfig.constraint}));
    });

    this.dataconfig2.forEach(eachConfig => {
      group.addControl(eachConfig.name, new FormControl(
        '', {validators: eachConfig.constraint}));
    });
    return group;
  }

  onSubmit() {
    console.log(this.adminsearchscheduleForm.value);
    console.log(this.adminsearchscheduleForm.get('dept_abbr').value);
    console.log(this.adminsearchscheduleForm.get('arr_abbr').value);
    console.log(this.adminsearchscheduleForm.get('dept_date').value);
    // const noofseats = this.adminsearchscheduleForm.get('airline').value;

  }

}


