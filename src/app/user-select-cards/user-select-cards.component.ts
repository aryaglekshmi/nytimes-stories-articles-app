import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-select-cards',
  templateUrl: './user-select-cards.component.html',
  styleUrls: ['./user-select-cards.component.scss'],
})
export class UserSelectCardsComponent {
  constructor(private router: Router) {}
  onUserClick(route: string) {
    this.router.navigate([`dashboard/${route}`]);
  }
}
