import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDetails} from '../userdetail';
import {HttpHeaders} from '@angular/common/http';
import {UserService} from '../user.service';
import {CompinteractionService} from '../compinteraction.service';
import {FlightList} from '../flightlist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('frm', {static: false}) form: any;
  userDetails: UserDetails;
  loginForm: FormGroup;
  selectedFlight: FlightList;
  loginStatus = '';
  invalidUser: boolean;
  serviceCallError: string;
  returnUrl: string;
  username = '';
  password = '';
  role = '';

//   enum ChangeDetectionStrategy {
//   OnPush: 0
//   Default: 1
// }
  constructor(private fb: FormBuilder, private router: Router, private service: UserService,
              private sessionService: CompinteractionService, private route: ActivatedRoute, private ref: ChangeDetectorRef) {
  }

  formConfig: any[] = [
    {
      name: 'userName', type: 'email',
      label: 'Username', errorMsg: 'Username is required',
      constraint: [Validators.required, Validators.maxLength(30), Validators.minLength(5)]
    },
    {
      name: 'password', type: 'password',
      label: 'Password', errorMsg: 'Password is required', constraint: Validators.required
    }
  ];

  ngOnInit() {
    this.loginForm = this.createForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    console.log(this.returnUrl);
    this.selectedFlight
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
    console.log('Data user name : ' + data.userName);
    console.log('Data password  : ' + data.password);
    console.log('Data role : ' + data.role);
    console.log(this.invalidUser);
    this.role = data.role;
    this.loginForm.reset();
    if (this.username === data.userName && this.password === data.password) {
      this.invalidUser = false;
      this.loginStatus = 'Valid user';
      console.log('Status:' + this.loginStatus);
      sessionStorage.setItem('userLogged', 'yes');
      sessionStorage.setItem('role', this.role);
      this.sessionService.changeLoginStatus('logged');
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.invalidUser = true;
      this.loginStatus = 'Invalid user';
      console.log('Status:' + this.loginStatus);
    }
    this.sessionService.loginStatus.subscribe(resp => {
      console.log(resp); } );
  }

  onSubmit() {
    this.username = this.loginForm.get('userName').value;
    this.password = this.loginForm.get('password').value;
    console.log(this.loginForm.value);
    this.service.findByUserName(this.loginForm.get('userName').value).
    subscribe(data => { this.validation(data); } ,
      (err) => {  this.captureError(err); } );
  }

  captureError(error) {
    this.serviceCallError = error.error.message;
    console.log(' in captureError func  ---------------------------- ');
    console.log(this.serviceCallError);
    this.invalidUser = true;
    // this.form.reset();

  }
}
