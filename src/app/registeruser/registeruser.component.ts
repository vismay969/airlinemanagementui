import { Component, OnInit } from '@angular/core';
import {Userdetail} from '../userdetail';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  registerDetails: Userdetail = new class implements Userdetail {
    userName: string;
    password: string;
    mobileNo: string;
    role: string;
  };

  constructor(private fb: FormBuilder, private route: Router ,  private service: UserService) { }


  ngOnInit() {
  }

  onSubmit(values) {
    console.log(values);
    this.registerDetails = values;
    this.registerDetails.role = 'U';
    console.log(this.registerDetails);
    this.service.addUser(this.registerDetails).subscribe(data => this.registerDetails = data);
  }

}


