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

  // Retrieve search history from session storage
  get getSearchHistory(): string[] {
    const searchHistory = sessionStorage.getItem(this.searchHistoryKey);
    return searchHistory ? JSON.parse(searchHistory) : [];
  }

  // Add a search word to the search history
  addSearchTerm(searchText: string): void {
    const searchHistory = this.getSearchHistory;
    this.newsService.searchText = searchText;

    // Check if the search word already exists in the history
    if (searchHistory.findIndex((e) => e === searchText) < 0) {
      searchHistory.unshift(searchText);

      // Limit the search history to a maximum of 5 entries
      if (searchHistory.length > 5) {
        searchHistory.pop();
      }

      // Store the updated search history in session storage
      sessionStorage.setItem(
        this.searchHistoryKey,
        JSON.stringify(searchHistory)
      );
    }
  }

  // Check if a search term is currently selected
  isSelectedSearchText(text: string) {
    return this.newsService.searchText === text;
  }

  // Track articles by their ID for better performance
  trackByFn(index: number, item: any): number {
    return item.id;
  }

  // Perform a search for articles based on the provided search text
  searchArticles(searchText: string) {
    this.addSearchTerm(searchText);
    this.newsComponent.getArticlesBasedOnSearch(searchText);
    this.searchText = '';
  }
}
