import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigationComponent } from './page-navigation.component';

describe('PageNavigationComponent', () => {
  let component: PageNavigationComponent;
  let fixture: ComponentFixture<PageNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNavigationComponent]
    });
    fixture = TestBed.createComponent(PageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
