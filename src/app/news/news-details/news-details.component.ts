import { Component, OnInit } from '@angular/core';
import { INYTimesStory } from '../news.interface';
import { NewsService } from '../redux/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  selectedNews: INYTimesStory = {} as INYTimesStory;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    // Retrieve the selected news from the news service
    this.selectedNews = this.newsService.getSelectedNews();
  }
}
