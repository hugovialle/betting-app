import { Component, OnInit, NgZone } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  pseudo:any = "";
  email:any = "";
  firstName:any = "";
  lastName:any = "";
  password:any = "";

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  handleRegister():void{
    let user = {
      pseudo: this.pseudo,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    }
    this.authService.register(user).subscribe(
      (userInfo:any) => {
        this.authService.connectedUser = userInfo;
        this.router.navigate(["/events"]);
      }, (error: any) => {
        console.log("error register:", error);
      });
  }
}
