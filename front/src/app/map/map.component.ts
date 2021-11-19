import { environment } from '../../environments/environment';
import {Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {EventCard} from "../models/event-card";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | any;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 48.86;
  lng = 2.33;

  currentMarkers:any = [];

  @Input() locations:any;
  @Input() event! : EventCard;
  @Output() selectedLocation = new EventEmitter<string>();

  constructor() { }


  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: this.event._id+"",
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });
  }

  /**
   * Built-in Angular function
   * The function is called everytime the values of Inputs change.
   */
  ngOnChanges(){
    this.setMarkers();
  }

  /**
   * Set every marker on the map based on the selected sport activity
   */
  setMarkers(){
    // Delete previous locations from the map
    this.resetMarkers();

    // Add the locations to the map
    if(this.locations !== undefined){
      for (let i = 0; i < this.locations.length; i++){
        const location = this.locations[i];

        const popupContent = document.createElement('div');
        popupContent.innerHTML = `<h3>${location.fields.equnom}</h3>
                  <p><span>${location.fields.insnovoie}</span>
                        <span>${location.fields.inslibellevoie}, </span>
                        <span>${location.fields.inscodepostal}</span>
                  </p>`;
        const atag = document.createElement('div');
        atag.style.display = "flex";
        atag.style.justifyContent = "center";
        atag.style.alignItems = "center";
        atag.innerHTML = `<button
                          style="width: 50%;
                          padding: 5px 0;
                          font-size: 12px;
                          border: none;
                          background: #61d2ff;
                          color: #fff;
                          border-radius: 8px;" id="${i}">Select</button>`

        popupContent.appendChild(atag);
        atag.addEventListener('click', (e)=>{
          this.setLocation(i);
        })
        let popup = new mapboxgl.Popup({offset: 25})
          .setDOMContent(popupContent);

        // make a marker for each feature and add it to the map
        let marker = new mapboxgl.Marker({ color: "#61d2ff"})
          .setLngLat([location.fields.equgpsx, location.fields.equgpsy])
          .setPopup(popup
          )
          .addTo(this.map);
        this.currentMarkers.push(marker);
      }
    }
  }

  /**
   * Removes all the markers on the map
   */
  resetMarkers(){
    if(this.currentMarkers != undefined && this.currentMarkers.length>0) {
      for (let i = 0; i < this.currentMarkers.length; i++){
        this.currentMarkers[i].remove();
      }
    }
  }

  setLocation(locationNumber:any){
    this.selectedLocation.emit(this.locations[locationNumber]);
  }
}
