import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AirportMaster} from './airportmaster';
import {FlightList} from './flightlist';
import {BookingInfo} from './bookinginfo';

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

  addBookingEntry(bookingInfoData: BookingInfo): Observable<BookingInfo> {
    console.log('in observable ' + bookingInfoData)
    return this.client.post<BookingInfo>(this.baseURL + '/bookingInfo/' + '1' + '/' + '16', bookingInfoData);
  }

}
