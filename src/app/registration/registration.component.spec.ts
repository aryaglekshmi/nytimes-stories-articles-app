import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationComponent } from './registration.component';
import { AuthService } from '../authorization/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [RegistrationComponent],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    spyOn(authService, 'register').and.returnValue(Promise.resolve(true));
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard on successful registration', async () => {
    component.userData = {
      email: 'test@example.com',
      password: 'password',
    } as IUser;
    component.confirmPassword = 'password';

    await component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(component.userData);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error message on failed registration', async () => {
    spyOn(authService, 'isValidEmail').and.returnValue(true);
    spyOn(console, 'log');
    component.userData = {
      email: 'test@example.com',
      password: 'password',
    } as IUser;
    component.confirmPassword = 'password';

    await component.onSubmit();

    expect(authService.isValidEmail).toHaveBeenCalledWith(
      component.userData.email
    );
    expect(authService.register).toHaveBeenCalledWith(component.userData);
    expect(console.log).toHaveBeenCalled();
  });

  it('should show error message for invalid email', async () => {
    spyOn(authService, 'isValidEmail').and.returnValue(false);

    component.userData = {
      email: 'invalidemail',
      password: 'password',
    } as IUser;
    component.confirmPassword = 'password';

    await component.onSubmit();

    expect(authService.isValidEmail).toHaveBeenCalledWith(
      component.userData.email
    );
    expect(component.showPopup).toBeTrue();
    expect(component.message).toBe('Enter a valid Email! ');
  });

  it('should show error message for password mismatch', async () => {
    component.userData = {
      email: 'test@example.com',
      password: 'password1',
    } as IUser;
    component.confirmPassword = 'password2';

    await component.onSubmit();
    expect(component.showPopup).toBeTrue();
    expect(component.message).toBe('Passwords do not match! ');
  });

  it('should close the popup', () => {
    component.closeModal();
    expect(component.showPopup).toBeFalse();
  });
});
