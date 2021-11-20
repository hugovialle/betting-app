import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { EventFormComponent } from "./event-form/event-form.component";
import { EventViewComponent } from './event-view/event-view.component';
import {AuthGuard} from "./auth.guard";
import {LoggedInAuthGuard} from "./logged-in-auth.guard";


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home', component:HomeComponent },
  {path: 'login', canActivate:[LoggedInAuthGuard], component:LoginComponent },
  {path: 'register', canActivate:[LoggedInAuthGuard], component: RegisterComponent },
  {path: 'events', component: EventsComponent },
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  {path: 'events/new', canActivate: [AuthGuard], component: EventFormComponent},
  {path: 'event/:id', component: EventViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
