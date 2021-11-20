
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

  date!:Date;
  hours!:number;
  minutes!:number;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private _router: Router,
    private tokenStorage: TokenStorageService) {
    this.router = _router.url;
  }

  ngOnInit(): void {
    this.date = new Date(this.event.date);
  }

  getDay():any{
    return this.formatZero(this.date.getDate());
  }

  getHours():any{
    return this.formatZero(this.date.getHours());
  }

  getMinutes():any{
    return this.formatZero(this.date.getMinutes());
  }

  getMonths():any {
    return this.formatZero(this.date.getMonth());
  }

  /**
   * Return a number formatted. Add a zero if number is only 1 digit
   * @example 5 => 05
   * @param number
   */
  formatZero(number:any) {
    return ('0'+number).slice(-2);
  };

  ball(sportType:string):any{
    if(sportType=="Football") {return this.footIcon}
    if(sportType=="Running") {return this.runningIcon}
    if(sportType=="Basketball") {return this.basketIcon}
    if(sportType=="Tennis") {return this.tennisIcon}
  }

  handleParticipate(){
    let userId = this.tokenStorage.getUser()._id;
    this.event.participants_id.push(userId);
    this.eventsService.updateEvent(this.event).subscribe(
      (event:any) =>{
        // this.event = event;
        console.log(event);
      },
      ()=>{
        console.log("Error");
        this.event.participants_id.pop();
      }
    );
  }

}
