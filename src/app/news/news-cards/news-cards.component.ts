import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INewsState, INYTimesArticle, INYTimesStory } from '../news.interface';
import { newsSelector } from '../redux/news.selectors';
import { Router } from '@angular/router';
import { NewsService } from '../redux/news.service';
import { PageNavigationComponent } from 'src/app/page-navigation/page-navigation.component';

@Component({
  selector: 'app-news-cards',
  templateUrl: './news-cards.component.html',
  styleUrls: ['./news-cards.component.scss'],
})
export class NewsCardsComponent implements OnInit, OnChanges {
  news$: Observable<INewsState>;
  topWorldNews: INYTimesStory[] = [];
  topScienceNews: INYTimesStory[] = [];
  newsListToDisplay: INYTimesStory[] = [];
  selectedNews: INYTimesStory = {} as INYTimesStory;

  @Input() activeTab: string = '';
  @Input() isArticleSearch: boolean = false;
  @ViewChild(PageNavigationComponent)
  paginationComponent!: PageNavigationComponent;

  //Pagination
  itemsPerPage = 6;
  totalPages = 1;
  currentPage = 1;

  isLoading = false;
  windowWidth = 1024;

  constructor(
    private store: Store<INewsState>,
    private router: Router,
    private newsService: NewsService
  ) {
    this.news$ = this.store.pipe(select(newsSelector));
  }

  ngOnInit(): void {
    if (!this.isArticleSearch) {
      this.news$?.subscribe(
        (newsWithState: INewsState) => {
          try {
            this.topScienceNews =
              newsWithState.ReducerForTopNews.topScienceNewsList;
            this.topWorldNews =
              newsWithState.ReducerForTopNews.topWorldNewsList;
            this.setNewsListBasedOnRoute();
          } catch (error) {
            // Handle the error here
            console.error(
              'An error occurred while processing the news data:',
              error
            );
          }
        },
        (error) => {
          // Handle any error that occurs during the subscription
          console.error(
            'An error occurred while subscribing to the news data:',
            error
          );
        }
      );
    }

    if (window.innerWidth <= 1024) {
      this.itemsPerPage = 2;
      this.setNewsListBasedOnRoute();
    }
    this.setItemsBasedOnWindowWidth();
  }

  ngOnChanges(): void {
    // Reset current page and update news list based on active tab
    this.currentPage = 1;
    this.setNewsListBasedOnRoute();
  }

  public getArticlesBasedOnSearch(searchText: string) {
    if (this.isArticleSearch) {
      this.isLoading = true;
      try {
        this.newsService
          .getArticleBasedOnSearch(searchText)
          .subscribe((articles: INYTimesArticle[]) => {
            this.newsService.articleListBasedOnSearch = articles;
            this.totalPages = Math.ceil(
              this.newsService.articleListBasedOnSearch.length /
                this.itemsPerPage
            );
            this.isLoading = false;
          });
      } catch (error) {
        // Handle any error that occurs during the subscription
        console.error('An error occurred:', error);
        this.isLoading = false;
      }
    }
  }

  setNewsListBasedOnRoute() {
    if (!this.isArticleSearch) {
      if (this.activeTab === 'worldNews') {
        this.newsListToDisplay = this.topWorldNews ? this.topWorldNews : [];
      } else {
        this.newsListToDisplay = this.topScienceNews ? this.topScienceNews : [];
      }
      this.totalPages = Math.ceil(
        this.newsListToDisplay.length / this.itemsPerPage
      );
    }
    // Calculate total number of pages
  }

  get paginatedNews() {
    if (this.newsListToDisplay?.length) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.newsListToDisplay.slice(startIndex, endIndex);
    }
    return [];
  }

  get paginatedArticles() {
    if (this.newsService.articleListBasedOnSearch?.length) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.newsService.articleListBasedOnSearch.slice(
        startIndex,
        endIndex
      );
    }
    return [];
  }

  updateCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

  showNewsDetails(news: INYTimesStory) {
    this.newsService.setSelectedNews(news);
    this.router.navigate(['/dashboard/newsDetails']);
  }

  showArticleDetails(article: INYTimesArticle) {
    this.newsService.setSelectedArticle(article);
    this.router.navigate(['/dashboard/articleDetails']);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setItemsBasedOnWindowWidth;
  }

  // Adjust items per page based on window size
  setItemsBasedOnWindowWidth() {
    this.windowWidth = window.innerWidth;
    this.itemsPerPage = 6;
    if (this.windowWidth > 1024) {
      this.itemsPerPage = 6;
    } else if (this.windowWidth < 768) {
      this.itemsPerPage = 2;
    }
    this.setNewsListBasedOnRoute();
  }
}
