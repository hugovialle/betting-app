import { Component, OnInit } from '@angular/core';
import { EventCard } from '../models/event-card';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: EventCard[] = [];
  //currentEvent: EventCard = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  size = 4;
  pageSizes = [4, 8, 12];

  selectedArrondissement:string = "";
  selectedSport:string = "";

  arrondissements = [ { id: ""},
    { id: "75001"},{ id: "75002"},{ id: "75003"},{ id: "75004"},{ id: "75005"},
    { id: "75006"},{ id: "75007"},{ id: "75008"},{ id: "75009"},{ id: "75010"},
    { id: "75011"},{ id: "75012"},{ id: "75013"},{ id: "75014"},{ id: "75015"},
    { id: "75016"},{ id: "75017"},{ id: "75018"},{ id: "75019"},{ id: "75020"}
  ];

  sports = [ {id: ""}, {id: "Football"}, {id: "Running"}, {id: "Basketball"}, {id: "Tennis"}];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getEventsPage();
  }

  getRequestParams(page: number, size: number): any {
    let params: any = {};
    if (page) {
      params[`page`] = page ;
    }
    if (size) {
      params[`size`] = size;
    }
    return params;
  }

  getEventsPage(): void {
    const selectedElements = {arrondissement: this.selectedArrondissement, sport: this.selectedSport};
    const params = this.getRequestParams(this.page, this.size);
    this.eventsService.getAllByPage(params.page, params.size, selectedElements)
      .subscribe(
        (response:any) => {
          const { events, totalItems } = response;
          this.events = events;
          this.count = totalItems;
          console.log(response);
        },
        (error:any) => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getEventsPage();
  }

  handlePageSizeChange(event: any): void {
    this.size = event.target.value;
    this.page = 1;
    this.getEventsPage();
  }

  handleFilterChange(): void {
    this.getEventsPage()
  }

  resetFilters() {
    this.selectedArrondissement = "";
    this.selectedSport = "";
    this.getEventsPage();
  }
}
