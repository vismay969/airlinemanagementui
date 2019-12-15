import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CompinteractionService} from '../compinteraction.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private service: CompinteractionService) { }

  ngOnInit() {
    sessionStorage.clear();
    this.service.changeLoginStatus('notlogged');
    console.log(sessionStorage.getItem('role'));
    this.router.navigate((['/home']));
  }

}
