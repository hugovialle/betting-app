import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../services/token-storage.service";
import {LoginComponent} from "../login/login.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isConnected = false;

  pseudo?: string;
  subscription!: Subscription;

  constructor(public authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.subscription = this.authService.connectedSource.subscribe(isConnected => this.isConnected = isConnected);

    this.isConnected = !!(this.tokenStorageService.getToken());
    console.log(this.isConnected);

    if (this.isConnected) {
      const user = this.tokenStorageService.getUser();
      this.pseudo = user.pseudo;
    }

  }

  handleLogOut(){
      this.tokenStorageService.signOut();
      this.isConnected = false;
      this.router.navigate(["/"]);
  }

}
