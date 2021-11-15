import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  logIn(user:any):any {
    const data = JSON.stringify(user);
    return this.http.post(`http://localhost:3000/api/user/login`, data, requestOptions);
  }

  register(user:any):any {
    return this.http.post(`http://localhost:3000/api/user/register`, user, requestOptions);
  }
}
