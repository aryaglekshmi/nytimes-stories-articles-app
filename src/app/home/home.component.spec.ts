import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../authorization/auth.service';
import { UserSelectCardsComponent } from '../user-select-cards/user-select-cards.component'; // Import the component

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceMock: Partial<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      isLoggedIn: false,
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent, UserSelectCardsComponent], // Include the component in the declarations
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Additional tests...
});
