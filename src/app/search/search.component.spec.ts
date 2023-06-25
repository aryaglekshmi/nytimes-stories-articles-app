import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SearchComponent } from './search.component';
import { NewsService } from '../news/redux/news.service';
import { NewsCardsComponent } from '../news/news-cards/news-cards.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

@Component({
  template: '',
})
class MockNewsCardsComponent {
  getArticlesBasedOnSearch(searchText: string) {}
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let newsService: NewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), FormsModule],
      declarations: [
        SearchComponent,
        MockNewsCardsComponent,
        NewsCardsComponent,
      ],
      providers: [NewsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a search term to the search history', () => {
    const searchText = 'Angular';
    component.addSearchTerm(searchText);
    const searchHistory = component.getSearchHistory;
    expect(searchHistory[0]).toBe(searchText);
  });

  it('should limit the search history to a maximum of 5 entries', () => {
    const searchHistory = ['Term1', 'Term2', 'Term3', 'Term4', 'Term5'];
    sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    const searchText = 'Term6';
    component.addSearchTerm(searchText);
    const updatedSearchHistory = component.getSearchHistory;
    expect(updatedSearchHistory.length).toBe(5);
    expect(updatedSearchHistory[0]).toBe(searchText);
  });

  it('should check if a search term is currently selected', () => {
    const searchText = 'Angular';
    newsService.searchText = searchText;
    const isSelected = component.isSelectedSearchText(searchText);
    expect(isSelected).toBeTrue();
  });

  it('should track articles by their ID', () => {
    const index = 0;
    const item = { id: 1 };
    const trackByResult = component.trackByFn(index, item);
    expect(trackByResult).toBe(item.id);
  });

  it('should perform a search for articles', () => {
    spyOn(component.newsComponent, 'getArticlesBasedOnSearch');
    const searchText = 'Angular';
    component.searchText = searchText;
    component.searchArticles(searchText);
    expect(
      component.newsComponent.getArticlesBasedOnSearch
    ).toHaveBeenCalledWith(searchText);
    expect(component.searchText).toBe('');
  });
});
