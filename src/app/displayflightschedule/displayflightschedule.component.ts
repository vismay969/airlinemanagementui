import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlightList} from '../flightlist';

@Component({
  selector: 'app-displayflightschedule',
  templateUrl: './displayflightschedule.component.html',
  styleUrls: ['./displayflightschedule.component.css']
})
export class DisplayflightscheduleComponent implements OnInit {
  @Input() flightSelection: FlightList[];

  @Output() flightSelected: EventEmitter<FlightList> =
    new EventEmitter<FlightList>();



  page: number;
  srchString: '';
  constructor() { }

  ngOnInit() {
  }


  onEdit(obj) {

    this.flightSelected = obj;
    this.flightSelected.emit(obj);
  }

}
