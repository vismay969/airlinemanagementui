import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AirportMaster} from './airportmaster';
import {FlightList} from './flightlist';
import {BookingInfo} from './bookinginfo';
import {UserDetails} from './userdetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = 'http://localhost:9090';
  constructor(private client: HttpClient) { }

  findAllAirports(airport: string): Observable<AirportMaster[]> {
    return this.client.get<AirportMaster[]>(this.baseURL + '/' + airport );
  }

  searchUserFlights(seatsBus: number, seatsFirst: number, arrAbbr: string, depAbbr: string, depDate: string)
    : Observable<FlightList[]> {
    return this.client.get<FlightList[]>
    (this.baseURL + '/flightMaster/' + seatsBus + '/' + seatsFirst + '/' + arrAbbr + '/' + depAbbr + '/' + depDate );
   }

  addBookingEntry(bookingInfoData: BookingInfo, userId: string, flightNo: number): Observable<BookingInfo> {
    console.log('in observable ' + bookingInfoData);
    return this.client.post<BookingInfo>(this.baseURL + '/bookingInfo/' + userId + '/' + flightNo , bookingInfoData);
  }

  // add in user service
  findAllBookingInfobyUserId(userId: string): Observable<BookingInfo[]> {
    return this.client.get<BookingInfo[]>(this.baseURL + '/bookingInfo/' + userId);
  }

  addUser(user: UserDetails): Observable<UserDetails> {
    return this.client.post<UserDetails>(this.baseURL + '/user' , user);

  }

  findByUserName(userName: string): Observable<UserDetails> {
    console.log('In FindByUserName ');
    console.log(userName);
    return this.client.get<UserDetails>(this.baseURL + '/user/' + userName);
  }

  cancelBookingEntry(bookingInfoData: BookingInfo): Observable<BookingInfo> {
    console.log('in observable ' + bookingInfoData);
    return this.client.put<BookingInfo>(this.baseURL + '/bookingInfo' , bookingInfoData);
  }

  sendEmail(bookingInfoData: BookingInfo): Observable<BookingInfo> {
     return this.client.post<BookingInfo>(this.baseURL + '/sendEmail/' , bookingInfoData);
  }


}
