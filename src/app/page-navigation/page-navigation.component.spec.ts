import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PageNavigationComponent } from './page-navigation.component';

describe('PageNavigationComponent', () => {
  let component: PageNavigationComponent;
  let fixture: ComponentFixture<PageNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(1);
    expect(component.hidePaginationNumbers).toBe(false);
  });

  it('should emit updateCurrentPage event when previousPage is called', () => {
    spyOn(component.updateCurrentPage, 'emit');
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toBe(1);
    expect(component.updateCurrentPage.emit).toHaveBeenCalledWith(1);
  });

  it('should emit updateCurrentPage event when nextPage is called', () => {
    spyOn(component.updateCurrentPage, 'emit');
    component.currentPage = 2;
    component.totalPages = 3;
    component.nextPage();
    expect(component.currentPage).toBe(3);
    expect(component.updateCurrentPage.emit).toHaveBeenCalledWith(3);
  });

  it('should emit updateCurrentPage event when selectPage is called', () => {
    spyOn(component.updateCurrentPage, 'emit');
    component.selectPage(5);
    expect(component.currentPage).toBe(5);
    expect(component.updateCurrentPage.emit).toHaveBeenCalledWith(5);
  });

  it('should generate an array of numbers from 1 to the given number using getRange method', () => {
    const range = component.getRange(5);
    expect(range).toEqual([1, 2, 3, 4, 5]);
  });
});
