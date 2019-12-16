export interface FlightList {
  flightNo: number;
  airline: string;
  dept_abbr: string;
  arr_abbr: string;
  noOfSeats_first: number;
  noOfSeats_business: number;
  flight_sch_No: number ;
  dept_date: string;
  dept_time: any;
  arr_date: string;
  arr_time: any;
  fare_first: number;
  seats_remaining_first: number;
  fare_business: number;
  seats_remaining_business: number;
  status_flag: string;

}
