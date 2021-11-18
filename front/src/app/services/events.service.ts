import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {EventCard} from "../models/event-card";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events:Array<any> = new Array<any>();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  addEvent(eventCard: any):any{
    return this.http.post("http://localhost:3000/api/events",eventCard);
  }

  deleteNote(eventId:any):Observable<any> {
    return this.http.delete("http://localhost:3000/api/events/"+eventId);
  }

  getEvents():any{
    return this.http.get("http://localhost:3000/api/events");
  }

  getEvent(eventId:any):Observable<any> {
    console.log(eventId);
    return this.http.get("http://localhost:3000/api/events/",eventId);
  }

  saveEvent(eventCard:EventCard):any {
    let index = this.events.indexOf(eventCard);
    this.events.splice(index,1);
    this.events.push(eventCard);
  }

  editEvent(eventCard:EventCard):void {
    let index = this.events.indexOf(eventCard);
    this.events.splice(index,1);
    this.events.push(eventCard);
    this.router.navigate(["/api/events/"+eventCard._id])
  }

  updateEvent(eventCard:EventCard):Observable<any>{
    return this.http.put("http://localhost:3000/api/events/"+eventCard._id, eventCard);
  }
}
