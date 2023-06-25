import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_KEY, NEWS_API, SEARCH_API } from 'src/app/constants';
import {
  INYTimesArticle,
  INYTimesSearchArticleResponse,
  INYTimesStoriesResponse,
  INYTimesStory,
} from '../news.interface';

@Injectable()
export class NewsService {
  private selectedNewsArticle: INYTimesStory = {} as INYTimesStory;
  private selectedArticle: INYTimesArticle = {} as INYTimesArticle;
  articleListBasedOnSearch: INYTimesArticle[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  getTopWorldNews(): Observable<any[]> {
    const url = `${NEWS_API}/world.json?api-key=${API_KEY}`;
    return this.http
      .get<INYTimesStoriesResponse>(url)
      .pipe(map((data) => data.results));
  }

  getTopScienceNews(): Observable<any[]> {
    const url = `${NEWS_API}/science.json?api-key=${API_KEY}`;
    return this.http
      .get<INYTimesStoriesResponse>(url)
      .pipe(map((data) => data.results));
  }

  getSelectedNews() {
    return this.selectedNewsArticle;
  }
  setSelectedNews(selectednNews: INYTimesStory) {
    this.selectedNewsArticle = selectednNews;
  }

  getSelectedArticle() {
    return this.selectedArticle;
  }
  setSelectedArticle(article: INYTimesArticle) {
    this.selectedArticle = article;
  }
  getArticleBasedOnSearch(keyword: string) {
    const url = `${SEARCH_API}${keyword}&api-key=${API_KEY}`;
    return this.http
      .get<INYTimesSearchArticleResponse>(url)
      .pipe(map((data) => data.response?.docs));
  }
}
