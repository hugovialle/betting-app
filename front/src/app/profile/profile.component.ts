import { Component, OnInit } from '@angular/core';
import { EventsService } from "../services/events.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  events: any;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getUserEvents();
  }

  getUserEvents(){
    this.eventsService.getEvents().subscribe(
      (events:any) =>{
        this.events = events;
        console.log(events);
      },
      ()=>{
        console.log("ErrorX");
      }
    )
  }
}
