import {Component, OnInit, NgZone, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  pseudo:any = "";
  email:any = "";
  firstName:any = "";
  lastName:any = "";
  password:any = "";

  isConnected = false;
  subscription!: Subscription;

  constructor(public authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isConnected = true;
    }

    this.subscription = this.authService.connectedSource.subscribe(isConnected => this.isConnected = isConnected);
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
      (info:any) => {
          this.tokenStorage.saveToken(info.accessToken);
          this.tokenStorage.saveUser(info);
          console.log(info);
          this.newConnection();
          this.router.navigate(["/events"]);
      }, (error: any) => {
        console.log("error log in:", error);
      });
  }

  newConnection() {
    this.authService.changeConnectionStatus(true)
  }
}
