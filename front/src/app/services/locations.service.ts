import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  getLocationById(locationId:any):Observable<any> {
    return this.http.get("http://localhost:3000/api/locations/id/"+locationId);
  }

  getLocationsBySport(sport:any):Observable<any> {
    return this.http.get("http://localhost:3000/api/locations/"+sport);
  }
}
