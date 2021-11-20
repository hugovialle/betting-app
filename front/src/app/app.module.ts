import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventsComponent } from './events/events.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { EventFormComponent } from './event-form/event-form.component';
import { MapComponent } from './map/map.component';
import { SportRadioButtonsComponent } from './sport-radio-buttons/sport-radio-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';


import { authInterceptorProviders } from './helpers/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventViewComponent } from './event-view/event-view.component';
import {AuthGuard} from "./auth.guard";
import {LoggedInAuthGuard} from "./logged-in-auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    EventCardComponent,
    EventsComponent,
    ProfileComponent,
    EventFormComponent,
    MapComponent,
    SportRadioButtonsComponent,
    EventViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    AuthGuard,
    LoggedInAuthGuard,
    authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
