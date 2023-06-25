import { Component } from '@angular/core';
import { IUser } from '../interfaces';
import { AuthService } from '../authorization/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  userData: IUser = {} as IUser;
  confirmPassword = '';
  showPopup = false;
  message = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.userData.password === this.confirmPassword) {
      if (this.authService.isValidEmail(this.userData.email)) {
        this.authService
          .register(this.userData)
          .then((result: boolean) => {
            if (result) {
              console.log('Registration successful!');
              this.router.navigate(['/dashboard']);
            } else {
              this.showPopup = true;
              this.message = 'Registeration failed! ';
            }
          })
          .catch((error) => {
            this.showPopup = true;
            this.message = `An error occurred during Register: ${error}`;
          });
      } else {
        this.showPopup = true;
        this.message = 'Enter a valid Email! ';
      }
    } else {
      this.showPopup = true;
      this.message = 'Passwords do not match! ';
    }
  }

  closeModal() {
    this.showPopup = false;
  }
}
