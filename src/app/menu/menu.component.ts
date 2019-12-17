import { Component, OnInit } from '@angular/core';
import {Navlink} from '../navlink';
import {UserService} from '../user.service';
import {CompinteractionService} from '../compinteraction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showLogin = 'inline';
  showLogout = 'none';
  visitor = true;
  selectedlink: string;

  userlinks: Navlink[] = [
    {link: 'home/default', text: 'Home'},
    {link: 'info', text: 'About Us'},
    {link: 'bookflight', text: 'Book Flight'},
    {link: 'history', text: 'My Bookings'}
  ];

  adminlinks: Navlink[] = [
    {link: 'home/default', text: 'Home'},
    {link: 'info', text: 'About Us'},
    {link: 'schedule', text: 'Flight Schedule'}
  ];


  constructor(private service: CompinteractionService, private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
    this.selectedlink = this.router.url;
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

