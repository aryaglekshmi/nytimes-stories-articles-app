import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsDetailsComponent } from './news-details.component';
import { NewsService } from '../redux/news.service';
import { INYTimesStory } from '../news.interface';

describe('NewsDetailsComponent', () => {
  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;
  let newsService: jasmine.SpyObj<NewsService>;

  beforeEach(async () => {
    const newsServiceSpy = jasmine.createSpyObj('NewsService', [
      'getSelectedNews',
    ]);

    await TestBed.configureTestingModule({
      declarations: [NewsDetailsComponent],
      providers: [{ provide: NewsService, useValue: newsServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService) as jasmine.SpyObj<NewsService>;
  });

  it('should create the NewsDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the selected news from the news service on initialization', () => {
    const selectedNews: INYTimesStory = {
      section: 'Politics',
      subsection: 'Elections',
      title: 'Presidential Election Results',
      abstract: 'A summary of the presidential election results.',
      url: 'https://www.nytimes.com/election',
      byline: 'By John Smith',
      item_type: 'article',
      updated_date: '2023-06-25T10:30:00Z',
      created_date: '2023-06-25T08:00:00Z',
      published_date: '2023-06-25T09:15:00Z',
      material_type_facet: 'news',
      kicker: 'Election News',
      des_facet: ['Elections', 'Politics', 'Results'],
      org_facet: ['Democratic Party', 'Republican Party'],
      per_facet: ['Joe Biden', 'Donald Trump'],
      geo_facet: ['United States'],
      multimedia: [],
    };
    newsService.getSelectedNews.and.returnValue(selectedNews);
    fixture.detectChanges(); // Trigger component initialization

    expect(newsService.getSelectedNews).toHaveBeenCalled();
    expect(component.selectedNews).toEqual(selectedNews);
  });
});
