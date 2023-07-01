import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleDetailsComponent } from './article-details.component';
import { INYTimesArticle } from '../news/news.interface';
import { NewsService } from '../news/redux/news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>; //It represents a wrapper around the component being tested and provides methods to interact with and observe the component's behavior.
  let newsService: NewsService;

  beforeEach(async () => {
    //describe function is a Jasmine function used to group related test cases or specifications
    await TestBed.configureTestingModule({
      declarations: [ArticleDetailsComponent],
      providers: [NewsService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    //Jasmine function that runs a given callback function before each it block or test case in a describe block.
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService);
  });

  it('should create the component', () => {
    // Jasmine function used to define an individual test case or specification.
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
    spyOn(newsService, 'getSelectedArticle').and.returnValue(mockArticle); // Spies are a powerful testing feature that allow you to "spy" on functions or methods and track their usage,

    fixture.detectChanges();

    expect(component.selectedArticle).toEqual(mockArticle);
    expect(newsService.getSelectedArticle).toHaveBeenCalled();
  });
});
