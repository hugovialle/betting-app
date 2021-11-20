import { Component, OnInit } from '@angular/core';
import { faBaseballBall, faBasketballBall, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from '../models/event-card';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  footIcon = faFutbol;
  basketIcon = faBasketballBall;
  tennisIcon = faBaseballBall;
  runningIcon = faRunning;

  public event!: EventCard;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.event = window.history.state.event;
    console.log(this.token.getUser());
  }

  ball(sportType:string):any{
    if(sportType=="Football") {return this.footIcon}
    if(sportType=="Running") {return this.runningIcon}
    if(sportType=="Basketball") {return this.basketIcon}
    if(sportType=="Tennis") {return this.tennisIcon}
  }
}
