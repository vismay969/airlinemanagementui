import { Component, OnInit } from '@angular/core';
import {CompinteractionService} from '../compinteraction.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: string;
  userName: string;
  userLogged: boolean ;

  constructor(private service: CompinteractionService) { }

  ngOnInit() {
    this.service.loginStatus.subscribe(resp => {
      console.log(resp);
      if (resp === 'logged') {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
      this.userName = sessionStorage.getItem('loggedUser');
      this.userRole = sessionStorage.getItem('role');
  });
}

}
