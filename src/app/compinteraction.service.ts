import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompinteractionService {
  loginStatus = new BehaviorSubject<string>('notLogged');
  constructor() { }

  changeLoginStatus(message: string): void {
    console.log(message);
    this.loginStatus.next(message);
  }
}
