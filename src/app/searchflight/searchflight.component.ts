import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CompinteractionService} from '../compinteraction.service';

@Component({
  selector: 'app-searchflight',
  templateUrl: './searchflight.component.html',
  styleUrls: ['./searchflight.component.css']
})

export class SearchflightComponent implements OnInit {
  searchflightForm: FormGroup;
  formConfig: any[] = [
  {name: 'dept_abbr', type: 'text', label: 'Departure Airport',
    errorMsg: 'Departure Airport Required',
    constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
  {name: 'arr_abbr', type: 'text', label: 'Arrival Airport',
    errorMsg: 'Arrival Airport Required',
    constraint: [Validators.required, Validators.minLength(3), Validators.maxLength(3)] },
  ];
  formConfig1: any[] = [
    {name: 'dept_date', type: 'date', label: 'Departure Date',
      errorMsg: 'Departure Date Required',
      constraint: Validators.required},
    {name: 'noofseats', type: 'number', label: 'No. of Seats',
      errorMsg: 'No. of Seats cannot be zero.',
      constraint: [Validators.required, Validators.max(5), Validators.min(1)] },
    {name: 'class', type: 'text', label: 'Class Type',
      errorMsg: 'Flight Class Required',
      constraint: [Validators.required, Validators.minLength(1), Validators.maxLength(1)] },
  ];
private loginStatus = 'invalid user';
Airports = ['BOM', 'AHD'];

constructor(private fb: FormBuilder, private router: Router, private service: CompinteractionService) { }

ngOnInit() {
  this.searchflightForm = this.createForm();
}

createForm(): FormGroup {
  const group = this.fb.group({});
  this.formConfig.forEach(eachConfig => {
    group.addControl(eachConfig.name, new FormControl(
      '', {validators: eachConfig.constraint}));
  });
  this.formConfig1.forEach(eachConfig => {
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


