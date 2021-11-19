import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
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

import { authInterceptorProviders } from './helpers/auth.interceptor';


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
    SportRadioButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
