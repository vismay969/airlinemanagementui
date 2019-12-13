import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlightList} from '../flightlist';

@Component({
  selector: 'app-displayflightdetails',
  templateUrl: './displayflightdetails.component.html',
  styleUrls: ['./displayflightdetails.component.css']
})
export class DisplayflightdetailsComponent implements OnInit {
  @Input() flightSelection: FlightList[];
  @Input() classSelected: number;
  @Input() passengerCount: number;
  @Output() flightSelected: EventEmitter<FlightList> =
    new EventEmitter<FlightList>();



  page: number;
  srchString: '';
  constructor() { }

  ngOnInit() {
  }


  onBook(obj) {

    this.flightSelected = obj;
    this.flightSelected.emit(obj);
  }


}
