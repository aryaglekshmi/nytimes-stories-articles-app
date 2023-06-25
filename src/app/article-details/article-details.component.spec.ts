import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleDetailsComponent } from './article-details.component';
import { INYTimesArticle } from '../news/news.interface';
import { NewsService } from '../news/redux/news.service';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;
  let newsService: NewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleDetailsComponent],
      providers: [NewsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedArticle from NewsService', () => {
    const mockArticle: INYTimesArticle = {
      abstract: 'Sample abstract',
      web_url: 'https://www.example.com',
      snippet: 'Sample snippet',
      lead_paragraph: 'Sample lead paragraph',
      print_section: 'Sample print section',
      print_page: 'Sample print page',
      source: 'Sample source',
      multimedia: [],
      headline: {
        main: 'Sample headline',
        print_headline: 'Sample print headline',
      },
      byline: {
        original: 'Sample byline',
        person: [
          {
            firstname: 'John',
            lastname: 'Doe',
          },
        ],
      },
      pub_date: new Date(),
      keywords: [
        {
          name: 'Sample keyword',
          value: 'Sample value',
        },
      ],
    };
    spyOn(newsService, 'getSelectedArticle').and.returnValue(mockArticle);

    fixture.detectChanges();

    expect(component.selectedArticle).toEqual(mockArticle);
    expect(newsService.getSelectedArticle).toHaveBeenCalled();
  });
});
