import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    pseudo: null,
    password: null
  }
  pseudo:any = "";
  password:any = "";
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

  handleLogIn():void{
    let user = this.form;
    this.authService.logIn(user).subscribe(
          (info:any) => {
            this.tokenStorage.saveToken(info.accessToken);
            this.tokenStorage.saveUser(info);
            this.newConnection();
            this.router.navigate(['/profile']);
            window.location.reload();
          }, (error: any) => {
            this.errorMessage = error.error.message;
            console.log("error log in:", error);
          });
  }

  newConnection() {
      this.authService.changeConnectionStatus(true)
  }

}
