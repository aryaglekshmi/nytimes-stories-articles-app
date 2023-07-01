import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../constants';
import { IUser } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  private expiryTimeInterval = 15; //15 minutes token expiration
  private userData: IUser = {} as IUser;

  expirationDate: Date | undefined;
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): string {
    return this.token;
  }
  setAccessToken(token: string): void {
    this.token = token;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  login(userData: IUser): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      try {
        this.http.post(`${SERVER_URL}/login`, userData).subscribe(
          (res: any) => {
            if (res) {
              this.setAccessToken(res['access_token']);
              this.userData = userData;
              this.isLoggedIn = true;
              this.setExpirationDate();
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            console.log(error);
            resolve(false);
          }
        );
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  }
  logOut() {
    this.isLoggedIn = false;
    this.setAccessToken('');
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
  // using /login since there is no such /refresh to get token after expiry date
  refreshToken(): Promise<void> {
    return new Promise<void>(() => {
      try {
        this.http.post(`${SERVER_URL}/login`, this.userData).subscribe(
          (res: any) => {
            if (res) {
              this.setAccessToken(res['access_token']);
              this.setExpirationDate();
            } else {
              console.error('Token refresh failed');
            }
          },
          (error) => {
            this.logOut();
            console.error('Token refresh failed' + error);
          }
        );
      } catch (error) {
        this.logOut();
        console.log(error);
      }
    });
  }

  // Check if the token is expired or will expire in the next 15 minutes
  isTokenExpiredOrExpiresSoon(): boolean {
    if (this.isLoggedIn && this.expirationDate) {
      const expiresInMs = this.expirationDate.getTime() - new Date().getTime();
      return expiresInMs <= 0;
    }
    return false;
  }

  register(userData: IUser): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      try {
        this.http.post(`${SERVER_URL}/register`, userData).subscribe(
          (res: any) => {
            if (res) {
              this.setAccessToken(res['access_token']);
              this.userData = userData;
              this.isLoggedIn = true;
              this.setExpirationDate();
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error) => {
            console.log(error);
            resolve(false);
          }
        );
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  }
  private setExpirationDate(): void {
    if (this.token && this.token.length > 0) {
      const expiryTimeIntervalInSeconds = this.expiryTimeInterval * 60 * 1000; //15 min in milliseconds
      this.expirationDate = new Date(
        new Date().getTime() + expiryTimeIntervalInSeconds
      );
      console.log(this.expirationDate + 'expirationDate');
    } else {
      this.expirationDate = undefined;
    }
  }
}
