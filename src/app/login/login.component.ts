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
  seatsCount: number;
  psgClass: string;
  inputFlight: any;
  loginStatus = '';
  invalidUser = false;
  serviceCallError: string;
  returnUrl: string;
  returnParams: string[];
  username = '';
  password = '';
  role = '';
  loggedUserId: number;
  loggedUser: string;

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
    console.log(this.invalidUser);
    this.loginForm = this.createForm();
    this.returnParams =  (this.route.snapshot.queryParams.returnUrl || '/');
    console.log(this.returnParams);
    if (this.returnParams.length === 3) {
    this.returnUrl = this.route.snapshot.queryParams.returnParams[0] || '/';
    this.psgClass = this.route.snapshot.queryParams.returnParams[1] || 0;
    this.seatsCount = this.route.snapshot.queryParams.returnParams[2] || 0;
    }
    console.log(this.returnUrl);
    console.log(this.seatsCount);
    console.log(this.route.snapshot.queryParams.returnUrl);
    console.log(this.route.snapshot.paramMap.get('selectedFlight'));
    this.route.params.subscribe(params => {
      console.log(params);
      this.inputFlight = params;
      this.selectedFlight = this.inputFlight;
    });
    console.log(this.selectedFlight);
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
    this.loggedUser = data.userName;
    this.loggedUserId = data.userId;
    this.loginForm.reset();
    if (this.username === data.userName && this.password === data.password) {
      this.invalidUser = false;
      this.loginStatus = 'Valid user';
      console.log('Status:' + this.loginStatus);
      sessionStorage.setItem('userLogged', 'yes');
      sessionStorage.setItem('role', this.role);
      sessionStorage.setItem('loggedUser', this.loggedUser);
      sessionStorage.setItem('loggedUserId', String(this.loggedUserId));
      this.sessionService.changeLoginStatus('logged');
      console.log(this.returnUrl);
      if (this.returnParams[0] === '/') {
        this.router.navigateByUrl('/home');
      } else {
        // this.router.navigate(['/home', this.selectedFlight]);
        this.router.navigate([this.returnUrl, this.selectedFlight],
        { queryParams: { returnUrl: [this.psgClass, this.seatsCount]}});
      }
      // this.router.navigateByUrl(this.returnUrl);
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
  onRegister() {
    this.router.navigate(['/register']);
  }
}
