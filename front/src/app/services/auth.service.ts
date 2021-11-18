import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser:any = null;
  // store the URL so we can redirect after logging in
  public redirectUrl: string | null = "http://localhost:4200/events";

  constructor(private http: HttpClient, private router: Router) { }

  logIn(user:any):Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/login`, user, { withCredentials: true});
  }

  register(user:any):Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/register`, user, { withCredentials: true});
  }

  logOut():Observable<any>{
    return this.http.post(`http://localhost:3000/api/user/logout`,{ withCredentials: true});
  }

  isLogged(){
    this.http.get(`http://localhost:3000/api/user/logout`, {withCredentials: true}).subscribe(
      (connectedUser) => {
        this.connectedUser = connectedUser;
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }
        console.log(this.connectedUser);
        console.log("Connected");
      },
      (error) => {
        console.log("Not connected");
      }
    )
  }

}
