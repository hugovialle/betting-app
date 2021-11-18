import { Component, OnInit } from '@angular/core';
import { EventCard } from "../models/event-card";
import { LocationsService } from "../services/locations.service";
import { EventsService } from "../services/events.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  rangeValue:string = "2"
  event: EventCard = new EventCard();
  locations:any;
  sport:string = "Football";
  selectedLocation!:any;
  locationName!:string;
  title!:string;

  constructor(private locationsService: LocationsService, private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.event._id = "new-event"; // to render MapBox properly
  }

  updateValue(event: any): void {
    this.rangeValue = event.target.value;
  }

  updateTitle(event: any): void {
    this.title = event.target.value;
  }

  changeSport(sport: string){
    this.sport = sport;
    this.event.sport = sport;
    this.getLocations()
  }

  handleSelectedLocation(location: any){
    this.selectedLocation = location._id;
    this.locationName = ""+location.fields.equnom+",  "+location.fields.insnovoie+" "+location.fields.inslibellevoie+", "+location.fields.inscodepostal;
    this.event.place_id = location._id;
  }

  getLocations() {
    this.locationsService.getLocationsBySport(this.sport).subscribe(
      (locations:any) => {
        this.locations = locations;
      },
      () => {
        console.log("Error retrieving locations");
      }
    )
  }

  addEvent(){
    this.event.date = "null"; //TODO
    this.event.title = this.title;
    this.event.place_id = this.selectedLocation._id;
    this.event.sport = this.sport;
    this.event.peopleCount = +this.rangeValue;
    this.event.creator_id = "null" //TODO
    this.event.participants_id = [];
    this.eventsService.addEvent(this.event).subscribe(
      (info:any) => {
        console.log(info);
        this.router.navigate(["/profile"]);
      }, (error: any) => {
        console.log("error event creation:", error);
      });
  }

}
