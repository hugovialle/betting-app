import {Component, Input, OnInit} from '@angular/core';
import { faBaseballBall, faBasketballBall, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons';
import {EventCard} from "../models/event-card";
import {ActivatedRoute, Router} from "@angular/router";
import { EventsService } from "../services/events.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  footIcon = faFutbol;
  basketIcon = faBasketballBall;
  tennisIcon = faBaseballBall;
  runningIcon = faRunning;

  @Input() event! : EventCard;

  constructor(private route: ActivatedRoute, private router: Router, private eventsService: EventsService) { }

  ngOnInit(): void {
  }

  ball(sportType:string):any{
    if(sportType=="Football") {return this.footIcon}
    if(sportType=="Running") {return this.runningIcon}
    if(sportType=="Basketball") {return this.basketIcon}
    if(sportType=="Tennis") {return this.tennisIcon}

  }

}
