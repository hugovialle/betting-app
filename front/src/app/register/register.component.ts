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

  form: any = {
    pseudo: null,
    email: null,
    firstName: null,
    lastName: null,
    password: null
  };

  errorMessage = '';
  isConnected = false;
  subscription!: Subscription;

  constructor(public authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.subscription = this.authService.connectedSource.subscribe(isConnected => this.isConnected = isConnected);

    if (this.tokenStorage.getToken()) {
      this.isConnected = true;
    }

  }

  handleRegister():void{

    let user = this.form;

    this.authService.register(user).subscribe(
      (info:any) => {
          this.tokenStorage.saveToken(info.accessToken);
          this.tokenStorage.saveUser(info);
          console.log(info);
          this.newConnection();
          this.router.navigate(["/events"]);
      }, (error: any) => {
        this.errorMessage = error.error.message;
        console.log("error log in:", error);
      });
  }

  newConnection() {
    this.authService.changeConnectionStatus(true)
  }
}
