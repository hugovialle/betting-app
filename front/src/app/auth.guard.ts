import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from "./services/token-storage.service";

@Injectable()
export class AuthGuard implements CanActivate {

  base_url!: string;

  constructor(private router: Router
    , private authService: AuthService, private tokenStorageService: TokenStorageService) {}

  canActivate() {
    // Check to see if a user has a valid token
    if (this.tokenStorageService.getToken()) {
      // If they do, return true and allow the user to load app
      return true;
    }
    // If not, they redirect them to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
