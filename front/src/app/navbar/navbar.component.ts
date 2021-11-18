import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleLogOut(){
    this.authService.logOut().subscribe(() => {
        this.router.navigate(["/events"]);
      },
      (error: any) => {
        console.log("error logout:", error);
      }
    )
  }
}
