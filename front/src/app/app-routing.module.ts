import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { EventFormComponent } from "./event-form/event-form.component";
import { EventsListComponent } from './events-list/events-list.component';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home', component:HomeComponent },
  {path: 'login', component:LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'events', component: EventsListComponent },
  {path: 'profile',  component: ProfileComponent },
  {path: 'events/new', canActivate: [AuthGuard], component: EventFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
