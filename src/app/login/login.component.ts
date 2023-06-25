import { Component } from '@angular/core';
import { IUser } from '../interfaces';
import { AuthService } from '../authorization/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userData: IUser = {} as IUser;
  showPopup = false;
  message = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.isValidEmail(this.userData.email)) {
      this.authService
        .login(this.userData)
        .then((result: boolean) => {
          if (result) {
            this.router.navigate(['/dashboard']);
            console.log('Login successful');
          } else {
            this.showPopup = true;
            this.message = 'Login failed! ';
          }
        })
        .catch((error) => {
          this.showPopup = true;
          this.message = `An error occurred during login: ${error}`;
        });
    } else {
      this.showPopup = true;
      this.message = 'Enter a valid Email! ';
    }
  }

  closeModal() {
    this.showPopup = false;
  }
}
