import { Component, OnInit } from '@angular/core';
import { faBaseballBall, faBasketballBall, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sport-radio-buttons',
  templateUrl: './sport-radio-buttons.component.html',
  styleUrls: ['./sport-radio-buttons.component.scss']
})
export class SportRadioButtonsComponent implements OnInit {
  footballIcon = faFutbol;
  basketballIcon = faBasketballBall;
  tennisIcon = faBaseballBall;
  runningIcon = faRunning;

  constructor() { }

  ngOnInit(): void {
  }

}
