import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pseudo:any = "";
  password:any = "";

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  handleLogIn():void{
    let user = {
      pseudo: this.pseudo,
      password: this.password
    }
    this.authService.logIn(user).subscribe(
      (userInfo:any) => {
        this.authService.connectedUser = userInfo;
        this.router.navigate(["/events"]);
      }, (error: any) => {
        console.log("error log in:", error);
      });
  }
}
