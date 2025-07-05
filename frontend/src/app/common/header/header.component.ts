import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgbModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   isCollapsed:boolean = false;
  loggedinstatus:boolean = false;
  constructor(private authService: AuthService){
    // this.loggedinstatus = this.authService.loggedIn;
    console.log("Header component is loaded");
  }

  logoutUser(){
    // this.authService.logout();
  }
}
