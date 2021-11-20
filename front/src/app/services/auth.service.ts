import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable } from "rxjs";
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isConnected!:boolean;
  public connectedSource = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) { }

  changeConnectionStatus(status: boolean) {
    this.connectedSource.next(status);
  }

  logIn(user:any):Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/login`, user, httpOptions);
  }

  register(user:any):Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/register`, user, httpOptions);
  }

  logOut():Observable<any>{
    return this.http.post(`http://localhost:3000/api/user/logout`,httpOptions);
  }

}
