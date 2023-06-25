import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authorization/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentDate: Date = new Date();

  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logOut();
  }

  //   Checks if the user is logged in.

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
