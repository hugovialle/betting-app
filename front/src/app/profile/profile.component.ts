import { Component, OnInit } from '@angular/core';
import { EventsService } from "../services/events.service";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from "../services/token-storage.service";
import {EventCard} from "../models/event-card";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  plusIcon = faPlusCircle;
  currentUser: any;
  events: any;

  constructor(private eventsService: EventsService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.getUserEvents();
    this.currentUser = this.token.getUser();

  }

  addEvent(newEvent: EventCard){
    this.events.push(newEvent);
  }

  getUserEvents(){
    this.eventsService.getEventsByUserId(this.token.getUser()._id).subscribe(
      (events:any) =>{
        this.events = events;
        console.log(events);
      },
      ()=>{
        console.log("Error");
      }
    )
  }
}
