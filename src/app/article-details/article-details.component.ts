import { Component, OnInit } from '@angular/core';
import { INYTimesArticle } from '../news/news.interface';
import { NewsService } from '../news/redux/news.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  selectedArticle: INYTimesArticle = {} as INYTimesArticle;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    // Retrieve the selected article from the news service to display its content.
    // only some data displayed
    this.selectedArticle = this.newsService.getSelectedArticle();
  }
}
