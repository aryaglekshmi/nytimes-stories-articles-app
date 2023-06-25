import { Component, ViewChild } from '@angular/core';
import { NewsService } from '../news/redux/news.service';
import { NewsCardsComponent } from '../news/news-cards/news-cards.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @ViewChild('cardsToDisplayArticles')
  newsComponent!: NewsCardsComponent;

  private readonly searchHistoryKey = 'searchHistory';
  searchText = '';

  constructor(private newsService: NewsService) {}

  get getSearchHistory(): string[] {
    const searchHistory = sessionStorage.getItem(this.searchHistoryKey);
    return searchHistory ? JSON.parse(searchHistory) : [];
  }

  addSearchTerm(searchText: string): void {
    const searchHistory = this.getSearchHistory;
    this.newsService.searchText = searchText;
    if (searchHistory.findIndex((e) => e === searchText) < 0) {
      searchHistory.unshift(searchText);
      if (searchHistory.length > 5) {
        searchHistory.pop();
      }
      sessionStorage.setItem(
        this.searchHistoryKey,
        JSON.stringify(searchHistory)
      );
    }
  }
  isSelectedSearchText(text: string) {
    return this.newsService.searchText === text;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  searchArticles(searchText: string) {
    this.addSearchTerm(searchText);
    this.newsComponent.getArticlesBasedOnSearch(searchText);
    this.searchText = '';
  }

  closeSearchPage() {
    throw new Error('Method not implemented.');
  }
}
