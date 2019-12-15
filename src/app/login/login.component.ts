import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserDetails} from '../userdetail';
import {HttpHeaders} from '@angular/common/http';
import {UserService} from '../user.service';
import {CompinteractionService} from '../compinteraction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userDetails: UserDetails;
  userFound: UserDetails;
  loginForm: FormGroup;
  loginStatus = '';
  invalidUser: boolean;

  constructor(private fb: FormBuilder, private route: Router, private service: UserService,
              private sessionService: CompinteractionService) {
  }

  serviceCallError: string;
  formConfig: any[] = [
    {
      name: 'userName', type: 'email',
      label: 'Username', errorMsg: 'Username is required',
      constraint: [Validators.required, Validators.maxLength(30), Validators.minLength(3)]
    },
    {
      name: 'password', type: 'password',
      label: 'Password', errorMsg: 'Password is required', constraint: Validators.required
    }
  ];

  ngOnInit() {
    this.loginForm = this.createForm();
  }


  createForm(): FormGroup {
    const group = this.fb.group({});
    this.formConfig.forEach(eachConfig => group.addControl(
      eachConfig.name, new FormControl('', {
        validators:
        eachConfig.constraint, updateOn: 'blur'
      })
    ));
    return group;
  }

  validation(data: UserDetails)  {
    const [username, password] = [this.loginForm.get('userName').value, this.loginForm.get('password').value];
    console.log('Data user name : ' + data.userName);
    console.log('Data password  : ' + data.password);
    console.log('user valid ? ');
    console.log(this.invalidUser);
    this.loginForm.reset();
    if (username === data.userName && password === data.password) {
      this.loginStatus = 'Valid user';
      sessionStorage.setItem('userLogged', 'yes');
      this.sessionService.changeLoginStatus('logged');
      this.route.navigate(['/home']);
      console.log('Status:' + this.loginStatus);
      this.invalidUser = false;
    } else {
      this.loginStatus = 'Invalid user';
      console.log('Status:' + this.loginStatus);
      this.invalidUser = true;
    }
    this.sessionService.loginStatus.subscribe(resp => {
      console.log(resp); } );
  }

  onSubmit() {
    console.log(this.loginForm.value);
    console.log(this.userDetails);
    console.log('Login Form' + this.loginForm.get('userName').value);
    this.userDetails = this.loginForm.value;
    console.log('values of form  ---------------------');
    console.log(this.userDetails);
    console.log('calling find user');
    /*
        subscribe(data => { this.validation(data); } ,
    */
    this.service.findByUserName(this.loginForm.get('userName').value).
    subscribe(data => { this.userFound = data; } ,
      (err) => {  this.captureError(err); } );
  }

  captureError(error) {
    this.serviceCallError = error.error.message;
    console.log(' in captureError func  ---------------------------- ');
    console.log(this.serviceCallError);
    this.invalidUser = true;
  }
}
