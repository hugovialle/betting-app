import {Component, NgZone, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public usersService: UsersService,
              private ngZone: NgZone,
              private router: Router) {
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  handleLogIn():void{
    let user = {
      email: this.email,
      password: this.password
    }
    this.usersService.logIn(user).subscribe(
      () => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      }, (error: any) => {
        console.log(error);
      });
  }
}
