import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {

  constructor(private router: Router
    , private authService: AuthService, private tokenStorageService: TokenStorageService) {}

  canActivate() {
    // Check to see if a user has no valid token
    if (!this.tokenStorageService.getToken()) {
      // If they don't, return true and keep the user on login or register page
      return true;
    }
    // If they do, they redirect them to the profile page
    this.router.navigate(['/profile']);
    return false;
  }

}
