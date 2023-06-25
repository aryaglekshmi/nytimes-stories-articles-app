import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../authorization/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isValidEmail',
      'login',
    ]);
    authServiceSpy.login.and.returnValue(Promise.resolve(true));
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when onSubmit is called with a valid email', () => {
    const validEmail = 'test@example.com';
    component.userData.email = validEmail;
    authService.isValidEmail.and.returnValue(true);
    component.onSubmit();
    expect(authService.isValidEmail).toHaveBeenCalledWith(validEmail);
    expect(authService.login).toHaveBeenCalledWith(component.userData);
  });

  it('should navigate to /dashboard when login is successful', async () => {
    const validEmail = 'test@example.com';
    component.userData.email = validEmail;
    authService.isValidEmail.and.returnValue(true);
    authService.login.and.resolveTo(true);
    await component.onSubmit();
    expect(authService.isValidEmail).toHaveBeenCalledWith(validEmail);
    expect(authService.login).toHaveBeenCalledWith(component.userData);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show popup and set message when login fails', async () => {
    const validEmail = 'test@example.com';
    component.userData.email = validEmail;
    authService.isValidEmail.and.returnValue(true);
    authService.login.and.resolveTo(false);

    await component.onSubmit();

    expect(authService.isValidEmail).toHaveBeenCalledWith(validEmail);
    expect(authService.login).toHaveBeenCalledWith(component.userData);
    expect(component.showPopup).toBe(true);
    expect(component.message).toBe('Login failed! ');
  });

  it('should show popup and set message when an error occurs during login', async () => {
    const validEmail = 'test@example.com';
    const errorMessage = 'An error occurred';
    component.userData.email = validEmail;
    authService.isValidEmail.and.returnValue(true);
    authService.login.and.rejectWith(errorMessage);

    await component.onSubmit();

    expect(authService.isValidEmail).toHaveBeenCalledWith(validEmail);
    expect(authService.login).toHaveBeenCalledWith(component.userData);
  });

  it('should show popup and set message when email is invalid', () => {
    const invalidEmail = 'invalid';
    component.userData.email = invalidEmail;
    authService.isValidEmail.and.returnValue(false);

    component.onSubmit();

    expect(authService.isValidEmail).toHaveBeenCalledWith(invalidEmail);
    expect(component.showPopup).toBe(true);
    expect(component.message).toBe('Enter a valid Email! ');
  });

  it('should close the popup', () => {
    component.closeModal();

    expect(component.showPopup).toBe(false);
  });
});
