import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {FlightList} from "./flightlist";
import {AirportMaster} from "./airportmaster";
import {BookingInfo} from "./bookinginfo";
import {Flightdetail} from "./flightdetail";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  baseURL = 'http://localhost:9090';

  constructor(private client: HttpClient) {
  }

  searchAdminFlights(seatsBus: number, seatsFirst: number, arrAbbr: string, depAbbr: string, depDate: string)
    : Observable<FlightList[]> {
    return this.client.get<FlightList[]>
    (this.baseURL + '/flightMaster/' + seatsBus + '/' + seatsFirst + '/' + arrAbbr + '/' + depAbbr + '/' + depDate);
  }

  findAllAirports(airport: string): Observable<AirportMaster[]> {
    return this.client.get<AirportMaster[]>(this.baseURL + '/' + airport);
  }

  editFlightDetails(flightdetail: Flightdetail, flightNo: number): Observable<Flightdetail> {
    console.log('in observable ' + flightdetail);
    return this.client.put<Flightdetail>(this.baseURL + '/flightDetail/' + flightNo, flightdetail);
  }


}
