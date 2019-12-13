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

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: SearchflightComponent},
  {path: 'login', component: LoginComponent},
  {path: 'list', component: DisplayflightdetailsComponent},

  // {path: 'logout', component: LogoutComponent},
  // {path: 'addcustomer', component: AddloancustomerComponent},
  // {path: 'showcustomer', component: ShowcustomerComponent},
  // {path: 'passenger', component: ShowpassengerComponent},
  {path: '**', redirectTo: 'home'}

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
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    ReactiveFormsModule, RouterModule.forRoot(routes), NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
