import { Component, OnInit } from '@angular/core';
import {Navlink} from '../navlink';
import {UserService} from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // links: string[] = ['Home', 'Book', 'Blog', 'Search'];
  showLogin = 'inline';
  showLogout = 'none';

  links: Navlink[] = [
    // {link: 'login', text: 'Login'},
    {link: 'info', text: 'About Us'},
    {link: 'userhistory', text: 'My Booking'},
    {link: 'userflight', text: 'Book Flight'}];

  constructor(private service: UserService) { }

  ngOnInit() {
    // this.service.loginStatus.subscribe(resp => {
    //   console.log(resp);
    //   if (resp === 'logged') {
        this.showLogin = 'none';
        this.showLogout = 'inline';
    //   } else {
    //     this.showLogin = 'inline';
    //     this.showLogout = 'none';
    //   }
    // });
  }

}

