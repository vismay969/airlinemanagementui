import { Component, OnInit } from '@angular/core';
import {UserDetails} from '../userdetail';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {


  registerDetails: UserDetails = new class implements UserDetails {
    userId: number;
    userName: string;
    password: string;
    mobileNo: string;
    role: string;
  };

  serviceCallError = '';

  constructor(private fb: FormBuilder, private router: Router, private service: UserService) {
  }


  ngOnInit() {
  }

  onSubmit(values) {
    console.log(values);
    this.registerDetails = values;
    this.registerDetails.role = 'U';
    console.log(this.registerDetails);
    this.service.addUser(this.registerDetails).subscribe(data => {
      this.registerDetails = data;
      this.router.navigate(['/login']);
    }, (err) => {
      this.captureError(err);
    });
      }

  captureError(error) {
    this.serviceCallError = error.error.message;
    console.log(' in captureError func  ---------------------------- ');
    console.log(this.serviceCallError);
    // this.form.reset();

  }
}


