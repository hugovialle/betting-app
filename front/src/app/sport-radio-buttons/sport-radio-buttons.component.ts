import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() newSportValue = new EventEmitter<string>();

  sports = [
    { value: "Football", icon: this.footballIcon, lowCase: "football"},
    { value: "Basketball", icon: this.basketballIcon, lowCase: "basketball"},
    { value: "Tennis", icon: this.tennisIcon, lowCase: "tennis"},
    { value: "Running", icon: this.runningIcon, lowCase: "sad"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(evt:any) {
    const target = evt.target;
    if (target.checked) {
      this.newSportValue.emit(target.value);
    }
  }

}
