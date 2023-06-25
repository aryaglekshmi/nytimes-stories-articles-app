import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as actions from './redux/news.actions';
import { INewsState } from './news.interface';
import { Observable } from 'rxjs';
import { newsSelector } from './redux/news.selectors';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  showLoading = false;
  activeTab = '';
  news$: Observable<INewsState>;

  constructor(private store: Store<INewsState>) {
    this.news$ = this.store.pipe(select(newsSelector)); // Selecting the news state from the store
    this.store.dispatch(actions.fetchTopScienceNews()); // Dispatching an action to fetch top science news
    this.store.dispatch(actions.fetchTopWorldNews()); // Dispatching an action to fetch top world news
  }
  ngOnInit(): void {
    this.activeTab = 'worldNews';
    this.news$.subscribe((newsWithState: INewsState) => {
      this.showLoading = newsWithState.ReducerForTopNews.isLoading;
    });
  }
}
