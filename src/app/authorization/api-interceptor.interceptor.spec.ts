import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ApiInterceptorInterceptor } from './api-interceptor.interceptor';
import { AuthService } from './auth.service';

describe('ApiInterceptorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptorInterceptor,
          multi: true,
        },
        AuthService,
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with access token for authenticated requests', () => {
    spyOnProperty(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'getAccessToken').and.returnValue('validAccessToken');
    http.get('/api/test').subscribe();
    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer validAccessToken'
    );
    req.flush({});
  });

  it('should proceed with the original request for unauthenticated requests', () => {
    spyOnProperty(authService, 'isLoggedIn').and.returnValue(false);
    http.get('/api/test').subscribe();
    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should refresh the token and retry the request for expired token', () => {
    spyOnProperty(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(authService, 'isTokenExpiredOrExpiresSoon').and.returnValue(true);
    spyOn(authService, 'getAccessToken').and.returnValue('expiredAccessToken');
    http.get('/api/test').subscribe();
    const req1 = httpMock.expectOne('/api/test');
    expect(req1.request.headers.has('Authorization')).toBe(false);
    const req2 = httpMock.expectOne('/api/test');
    expect(req2.request.headers.has('Authorization')).toBe(true);
    expect(req2.request.headers.get('Authorization')).toBe(
      'Bearer newAccessToken'
    );
    req1.flush({});
    req2.flush({});
  });
});
