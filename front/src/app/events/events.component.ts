import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EventsService} from "../services/events.service";
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events:any;

  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.getEvents();
  }

  editEvent(eventId:number):void{
    this.router.navigate(["/event", eventId]);
  }

  getEvents(){
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
