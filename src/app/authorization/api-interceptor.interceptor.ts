import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class ApiInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authService.isLoggedIn) {
      // If the user is not logged in, proceed with the original request.
      return next.handle(request);
    }

    if (this.authService.isTokenExpiredOrExpiresSoon()) {
      // If the token is expired or expires soon, refresh it and add the new token to the request headers.
      return from(this.authService.refreshToken()).pipe(
        //return from(...) is used to convert a promise or another iterable object into an Observable
        mergeMap(() => {
          const accessToken = this.authService.getAccessToken();
          return this.handleRequestWithToken(request, next, accessToken);
        })
      );
    } else {
      // If the token is still valid, add it to the request headers.
      const accessToken = this.authService.getAccessToken();
      return this.handleRequestWithToken(request, next, accessToken);
    }
  }

  private handleRequestWithToken(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    token: string
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);
  }
}
