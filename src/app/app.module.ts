import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SearchflightComponent } from './searchflight/searchflight.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { DisplayflightdetailsComponent } from './displayflightdetails/displayflightdetails.component';
import { BookinginfoComponent } from './bookinginfo/bookinginfo.component';
import { FlightticketComponent } from './flightticket/flightticket.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { SearchschedulesComponent } from './searchschedules/searchschedules.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DisplayflightscheduleComponent } from './displayflightschedule/displayflightschedule.component';
import { EditflightscheduleComponent } from './editflightschedule/editflightschedule.component';
import { AirportinfoComponent } from './airportinfo/airportinfo.component';
import { ViewflightmasterComponent } from './viewflightmaster/viewflightmaster.component';
import {ModalModule} from 'ngx-bootstrap';
import { FilterPipe } from './filter.pipe';
import {MyguardGuard} from './myguard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'default', pathMatch: 'full'},
  {path: 'home/default', component: SearchflightComponent},
  // {path: 'default', component: SearchflightComponent, canDeactivate: [MyguardGuard]},
  {path: 'default', component: SearchflightComponent},
  {path: 'bookflight', component: SearchflightComponent},
  {path: 'home/:selectedFlight', component: SearchflightComponent},
  {path: 'info', component: AboutusComponent},
  {path: 'history', component: BookinghistoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:selectedFlight', component: LoginComponent},
  {path: 'register', component: RegisteruserComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'schedule', component: SearchschedulesComponent},
  {path: 'flightticket', component: FlightticketComponent},
  {path: 'flightticket/:selectedTicket', component: FlightticketComponent},
  {path: '**', redirectTo: 'default'}
  // {path: 'addcustomer', component: AddloancustomerComponent},
  // {path: 'showcustomer', component: ShowcustomerComponent},
  // {path: 'passenger', component: ShowpassengerComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SearchflightComponent,
    LoginComponent,
    DisplayflightdetailsComponent,
    BookinginfoComponent,
    FlightticketComponent,
    RegisteruserComponent,
    SearchschedulesComponent,
    BookinghistoryComponent,
    LogoutComponent,
    AboutusComponent,
    DisplayflightscheduleComponent,
    EditflightscheduleComponent,
    AirportinfoComponent,
    ViewflightmasterComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    ReactiveFormsModule, RouterModule.forRoot(routes), NgxPaginationModule, ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
