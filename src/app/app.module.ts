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

const routes: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: 'login', component: LoginComponent},
  // {path: 'logout', component: LogoutComponent},
  // {path: 'addcustomer', component: AddloancustomerComponent},
  // {path: 'showcustomer', component: ShowcustomerComponent},
  // {path: 'passenger', component: ShowpassengerComponent},
  // {path: '**', redirectTo: 'login'}

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SearchflightComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    ReactiveFormsModule, RouterModule.forRoot(routes), NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
