import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { EventCard } from "../models/event-card";
import { LocationsService } from "../services/locations.service";
import { EventsService } from "../services/events.service";
import { Router } from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";

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
  currentUser:any;

  hours = [ {id: ""}, {id: "8"}, {id: "9"}, {id: "10"}, {id: "11"}, {id: "12"}, {id: "13"}, {id: "14"}, {id: "15"}, {id: "16"}, {id: "17"}, {id: "18"}, {id: "19"}, {id: "20"}, {id: "21"}, {id: "22"}];

  minutes = [ {id: ""}, {id: "05"}, {id: "10"}, {id: "15"}, {id: "20"}, {id: "25"}, {id: "30"}, {id: "35"}, {id: "40"}, {id: "45"}, {id: "50"}, {id: "55"}];


  @Output() newEventEvent = new EventEmitter<EventCard>();

  constructor(private locationsService: LocationsService, private eventsService: EventsService, private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.event._id = "new-event"; // to render MapBox properly
    this.currentUser = this.token.getUser();
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
    this.event.arrondissement = location.fields.inscodepostal;
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
    this.event.sport = this.sport;
    this.event.peopleCount = +this.rangeValue;
    console.log(this.event.arrondissement);
    this.event.creator_id = this.token.getUser()._id;
    this.event.participants_id = [];
    this.eventsService.addEvent(this.event).subscribe(
      (info:any) => {
        console.log(info);
        this.newEventEvent.emit(this.event); // send the new event to parent to display it directly without page reload
        this.router.navigate(["/profile"]);
      }, (error: any) => {
        console.log("error event creation:", error);
      });
  }

}
