
import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { faBaseballBall, faBasketballBall, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons';
import {EventCard} from "../models/event-card";
import {ActivatedRoute} from "@angular/router";
import { EventsService } from "../services/events.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  footIcon = faFutbol;
  basketIcon = faBasketballBall;
  tennisIcon = faBaseballBall;
  runningIcon = faRunning;

  @Input() event! : EventCard;
  router: string;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private _router: Router,
              private tokenStorage: TokenStorageService) {
    this.router = _router.url;
  }

  ngOnInit(): void {
  }

  ball(sportType:string):any{
    if(sportType=="Football") {return this.footIcon}
    if(sportType=="Running") {return this.runningIcon}
    if(sportType=="Basketball") {return this.basketIcon}
    if(sportType=="Tennis") {return this.tennisIcon}

  }

  handleParticipate(){
    let userId = this.tokenStorage.getUser()._id;
    this.event.participants_id.push(userId);
    console.log(userId);
    console.log(this.event);
    this.eventsService.updateEvent(this.event).subscribe(
      (event:any) =>{
        //this.event = event;
        console.log(event);
      },
      ()=>{
        console.log("Error");
        //this.event.participants_id.pop();
      }
    );
  }

}
