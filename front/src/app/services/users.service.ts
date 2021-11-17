import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  logIn(user:any):any {
    return this.http.post(`http://localhost:3000/api/user/login`, user, {observe: 'response'})
      .pipe(
        tap(resp => console.log('response:', resp)));
  }

  register(user:any):any {
    return this.http.post(`http://localhost:3000/api/user/register`, user, {observe: 'response'})
      .pipe(
        tap(resp => console.log('response:', resp)));
  }

}
