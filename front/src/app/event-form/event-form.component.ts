import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  rangeValue:string = "2"
  constructor() { }

  ngOnInit(): void {
  }

  updateValue(event: any): void {
    this.rangeValue = event.target.value;
  }
}
