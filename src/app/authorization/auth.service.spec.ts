import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { SERVER_URL } from '../constants';
import { HomeComponent } from '../home/home.component';
import { NewsRoutingModule } from '../news/news-routing.module';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
        NewsRoutingModule,
      ],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should set and retrieve the access token', () => {
    const token = 'sample-token';
    authService.setAccessToken(token);
    expect(authService.getAccessToken()).toEqual(token);
  });

  it('should validate email correctly', () => {
    const validEmail = 'test@example.com';
    const invalidEmail = 'test.example.com';
    expect(authService.isValidEmail(validEmail)).toBe(true);
    expect(authService.isValidEmail(invalidEmail)).toBe(false);
  });

  it('should log in successfully', (done) => {
    const userData = { email: 'test', password: 'password' };
    authService.login(userData).then((result) => {
      expect(result).toBe(true);
      expect(authService.isLoggedIn).toBe(true);
      done();
    });

    const request = httpMock.expectOne(`${SERVER_URL}/login`);
    expect(request.request.method).toBe('POST');
    request.flush({ access_token: 'sample-token' });
  });

  it('should log out successfully', () => {
    authService.logOut();
    expect(authService.isLoggedIn).toBe(false);
    expect(authService.getAccessToken()).toEqual('');
  });

  it('should check if token is expired or expires soon', () => {
    const expiryTimeIntervalInSeconds = 15 * 60 * 1000;
    // Test case where token is expired
    authService.isLoggedIn = true;
    authService.expirationDate = new Date(
      new Date('2023-06-01').getTime() + expiryTimeIntervalInSeconds
    );
    expect(authService.isTokenExpiredOrExpiresSoon()).toBe(true);

    // Test case where token expires soon
    authService.expirationDate = new Date(
      new Date('2023-06-25T12:30:00').getTime() + expiryTimeIntervalInSeconds
    );
    expect(authService.isTokenExpiredOrExpiresSoon()).toBe(true);

    // Test case where user is not logged in
    authService.isLoggedIn = false;
    authService.expirationDate = new Date(
      new Date('2023-06-25T13:00:00').getTime() + expiryTimeIntervalInSeconds
    );
    expect(authService.isTokenExpiredOrExpiresSoon()).toBe(false);
  });

  it('should register successfully', (done) => {
    const userData = { email: 'test', password: 'password' };

    authService.register(userData).then((result) => {
      expect(result).toBe(true);
      expect(authService.isLoggedIn).toBe(true);
      done();
    });

    const request = httpMock.expectOne(`${SERVER_URL}/register`);
    expect(request.request.method).toBe('POST');
    request.flush({ access_token: 'sample-token' });
  });
});
