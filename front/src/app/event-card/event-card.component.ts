import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBaseballBall, faBasketballBall, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons';

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

  router: string;

  constructor(private _router: Router) {
    this.router = _router.url;
  }

  ngOnInit(): void {
  }

}
