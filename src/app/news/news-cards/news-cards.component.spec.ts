import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { INewsState, INYTimesStory } from '../news.interface';
import { NewsCardsComponent } from './news-cards.component';
import { NewsService } from '../redux/news.service';
import { PageNavigationComponent } from 'src/app/page-navigation/page-navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsRoutingModule } from '../news-routing.module';
import { NewsDetailsComponent } from '../news-details/news-details.component';

describe('NewsCardsComponent', () => {
  let component: NewsCardsComponent;
  let fixture: ComponentFixture<NewsCardsComponent>;
  let store: Store<INewsState>;
  let newsService: NewsService;

  const mockNewsState: INewsState = {
    ReducerForTopNews: {
      topScienceNewsList: [
        {
          section: 'News',
          subsection: 'Science',
          title: 'Lorem Ipsum',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          url: 'https://www.example.com',
          byline: 'John Doe',
          item_type: 'Article',
          updated_date: '2023-06-25T10:30:00Z',
          created_date: '2023-06-24T15:45:00Z',
          published_date: '2023-06-24T16:00:00Z',
          material_type_facet: 'News',
          kicker: 'Breaking News',
          des_facet: ['Lorem', 'Ipsum', 'Dolor'],
          org_facet: ['Organization 1', 'Organization 2'],
          per_facet: ['Person 1', 'Person 2'],
          geo_facet: ['Location 1', 'Location 2'],
          multimedia: [],
        },
      ],
      topWorldNewsList: [
        {
          section: 'News',
          subsection: 'World',
          title: 'Lorem Ipsum',
          abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          url: 'https://www.example.com',
          byline: 'John Doe',
          item_type: 'Article',
          updated_date: '2023-06-25T10:30:00Z',
          created_date: '2023-06-24T15:45:00Z',
          published_date: '2023-06-24T16:00:00Z',
          material_type_facet: 'News',
          kicker: 'Breaking News',
          des_facet: ['Lorem', 'Ipsum', 'Dolor'],
          org_facet: ['Organization 1', 'Organization 2'],
          per_facet: ['Person 1', 'Person 2'],
          geo_facet: ['Location 1', 'Location 2'],
          multimedia: [],
        },
      ],
      isLoading: false,
      error: '',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([
          { path: 'dashboard/newsDetails', component: NewsDetailsComponent },
        ]),
        NewsRoutingModule,
      ],
      declarations: [NewsCardsComponent, PageNavigationComponent],
      providers: [NewsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    newsService = TestBed.inject(NewsService);

    spyOn(store, 'pipe').and.returnValue(of(mockNewsState));
    spyOn(newsService, 'getArticleBasedOnSearch').and.returnValue(
      of([
        {
          abstract: 'Sample abstract',
          web_url: 'https://www.example.com',
          snippet: 'Sample snippet',
          lead_paragraph: 'Sample lead paragraph',
          print_section: 'Sample print section',
          print_page: 'Sample print page',
          source: 'Sample source',
          multimedia: [],
          headline: { main: 'Sample headline' },
          byline: { original: 'Sample author' },
          pub_date: new Date('2023-06-25'),
          keywords: [],
        },
      ])
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set news list based on route for world news', () => {
    component.activeTab = 'worldNews';
    component.isArticleSearch = false;

    component.setNewsListBasedOnRoute();

    expect(component.newsListToDisplay).toEqual([]);
  });

  it('should set news list based on route for science news', () => {
    component.activeTab = 'scienceNews';
    component.isArticleSearch = false;
    component.setNewsListBasedOnRoute();
    expect(component.newsListToDisplay).toEqual([]);
  });

  it('should set articles based on search', () => {
    component.isArticleSearch = true;

    component.getArticlesBasedOnSearch('search');

    expect(newsService.getArticleBasedOnSearch).toHaveBeenCalledWith('search');
    expect(newsService.articleListBasedOnSearch).toEqual([
      {
        abstract: 'Sample abstract',
        web_url: 'https://www.example.com',
        snippet: 'Sample snippet',
        lead_paragraph: 'Sample lead paragraph',
        print_section: 'Sample print section',
        print_page: 'Sample print page',
        source: 'Sample source',
        multimedia: [],
        headline: { main: 'Sample headline' },
        byline: { original: 'Sample author' },
        pub_date: new Date('2023-06-25'),
        keywords: [],
      },
    ]);
    expect(component.isLoading).toBe(false);
  });

  it('should update current page', () => {
    const currentPage = 2;
    component.updateCurrentPage(currentPage);
    expect(component.currentPage).toBe(currentPage);
  });

  it('should show news details and navigate to news details page', () => {
    const news: INYTimesStory = {
      section: 'News',
      subsection: 'Science',
      title: 'Lorem Ipsum',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: 'https://www.example.com',
      byline: 'John Doe',
      item_type: 'Article',
      updated_date: '2023-06-25T10:30:00Z',
      created_date: '2023-06-24T15:45:00Z',
      published_date: '2023-06-24T16:00:00Z',
      material_type_facet: 'News',
      kicker: 'Breaking News',
      des_facet: ['Lorem', 'Ipsum', 'Dolor'],
      org_facet: ['Organization 1', 'Organization 2'],
      per_facet: ['Person 1', 'Person 2'],
      geo_facet: ['Location 1', 'Location 2'],
      multimedia: [],
    };
    spyOn(newsService, 'setSelectedNews');

    component.showNewsDetails(news);

    expect(newsService.setSelectedNews).toHaveBeenCalledWith(news);
  });
});
