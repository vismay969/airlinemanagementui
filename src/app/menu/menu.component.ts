import { Component, OnInit } from '@angular/core';
import {Navlink} from '../navlink';
import {UserService} from '../user.service';
import {CompinteractionService} from '../compinteraction.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showLogin = 'inline';
  showLogout = 'none';
  visitor = true;

  userlinks: Navlink[] = [
    {link: 'home', text: 'Home'},
    {link: 'info', text: 'About Us'},
    {link: 'bookflight', text: 'Book Flight'},
    {link: 'history', text: 'My Booking'}
  ];

  adminlinks: Navlink[] = [
    {link: 'home', text: 'Home'},
    {link: 'info', text: 'About Us'},
    {link: 'schedule', text: 'Search Flight Schedule'}
  ];


  constructor(private service: CompinteractionService) { }

  ngOnInit() {
    this.service.loginStatus.subscribe(resp => {
      console.log(resp);
      if (resp === 'logged') {
        this.showLogin = 'none';
        this.showLogout = 'inline';
      } else {
        this.showLogin = 'inline';
        this.showLogout = 'none';
      }
      const role = sessionStorage.getItem('role');
      console.log(role);
      if (role === 'A') {
        this.visitor = false;
      } else {
        this.visitor = true;
      }
    });

    }

}

