import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public usersService: UsersService) {
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
    this.usersService.logIn(user).subscribe();
  }
}
