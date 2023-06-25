import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authorization/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showSelectCards = false;
  constructor(private authservice: AuthService) {}
  ngOnInit(): void {
    this.showSelectCards = this.authservice.isLoggedIn;
  }
}
