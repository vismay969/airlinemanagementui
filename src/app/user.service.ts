import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AirportMaster} from './airport-master';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = 'http://localhost:9090';
  constructor(private client: HttpClient) { }

  findAllAirports(airport: string): Observable<AirportMaster[]> {
    return this.client.get<AirportMaster[]>(this.baseURL + '/' + airport );
  }



}
