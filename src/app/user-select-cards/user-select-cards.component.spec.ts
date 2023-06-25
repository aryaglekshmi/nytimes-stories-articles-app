import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectCardsComponent } from './user-select-cards.component';

describe('UserSelectCardsComponent', () => {
  let component: UserSelectCardsComponent;
  let fixture: ComponentFixture<UserSelectCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSelectCardsComponent]
    });
    fixture = TestBed.createComponent(UserSelectCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
