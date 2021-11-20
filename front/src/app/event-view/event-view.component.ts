import { Component, OnInit } from '@angular/core';
import { faBaseballBall, faBasketballBall, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from '../models/event-card';
import { TokenStorageService } from '../services/token-storage.service';
import {AuthService} from "../services/auth.service";
import {EventsService} from "../services/events.service";
import {LocationsService} from "../services/locations.service";

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

  icons = [
    '../../assets/images/avatars/0.png',
    '../../assets/images/avatars/1.png',
    '../../assets/images/avatars/2.png',
    '../../assets/images/avatars/3.png',
    '../../assets/images/avatars/4.png',
    '../../assets/images/avatars/5.png',
    '../../assets/images/avatars/6.png',
    '../../assets/images/avatars/7.png',
    '../../assets/images/avatars/8.png',
    '../../assets/images/avatars/9.png',
    '../../assets/images/avatars/10.png',
    '../../assets/images/avatars/11.png',
    '../../assets/images/avatars/12.png',
    '../../assets/images/avatars/13.png',
    '../../assets/images/avatars/14.png',
  ]

  public event!: EventCard;
  date!: Date;
  participants:Array<any> = [] ;
  creator!:any;
  creatorFirstName!:string;
  location!:any;
  nbr!:string;
  street!:string;
  arrondissement!:string;

  constructor(private token: TokenStorageService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private eventsService: EventsService,
              private locationsService: LocationsService
  ) { }

  ngOnInit(): void {
    this.event = window.history.state.event;
    this.date = new Date(this.event.date);
    this.getParticipants();
    console.log(this.participants);
    this.getCreator();
    this.getLocation();
  }

  getDay():any{
    return this.formatZero(this.date.getDate());
  }

  getMonths():any {
    return this.formatZero(this.date.getMonth());
  }

  getYear():any {
    return this.formatZero(this.date.getFullYear());
  }

  /**
   * Return a number formatted. Add a zero if number is only 1 digit
   * @example 5 => 05
   * @param number
   */
  formatZero(number:any) {
    return ('0'+number).slice(-2);
  };

  getParticipants(){
    if(this.event.participants_id != undefined && this.event.participants_id.length>0){
      for(let i = 0; i<this.event.participants_id.length; i++){
        this.authService.getUserById(this.event.participants_id[i]).subscribe(
          (user:any) => {
              this.participants.push(user[0]);
                },
                (error:any) => {
                  console.log(error);
                }
              );
      }
    }
  }

  getCreator(){
    if(this.event.creator_id != undefined){
      this.authService.getUserById(this.event.creator_id).subscribe(
        (user:any) => {
          this.creator = user[0];
          this.creatorFirstName = user[0].firstName;
        },
        (error:any) => {
          console.log(error);
        }
      );
    }
  }

  getLocation(){
    if(this.event.place_id != undefined){
      this.locationsService.getLocationById(this.event.place_id).subscribe(
        (location:any) => {
          this.location = location[0];
          console.log(location);
          this.nbr = location[0].fields.insnovoie;
          this.street = location[0].fields.inslibellevoie;
          this.arrondissement = location[0].fields.inscodepostal;
        },
        (error:any) => {
          console.log(error);
        }
      );
    }
  }

  handleParticipate(){
    this.participants.push(this.tokenStorage.getUser());
    this.eventsService.updateEvent(this.event).subscribe(
      (event:any) =>{
        this.event = event;
      },
      ()=>{
        console.log("Error");
        this.event.participants_id.pop();
      }
    );
  }
}
