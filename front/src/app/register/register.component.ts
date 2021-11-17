import { Component, OnInit, NgZone } from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  pseudo: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(public usersService: UsersService,
              private ngZone: NgZone,
              private router: Router) {
    this.pseudo = "";
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.password = "";
  }

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
    this.usersService.register(user).subscribe(
      () => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      }, (error: any) => {
        console.log(error);
      });
  }
}
