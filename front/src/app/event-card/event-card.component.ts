import { Component, OnInit } from '@angular/core';
import { faBaseballBall, faBasketballBall, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons';

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
  constructor() { }

  ngOnInit(): void {
  }

}
