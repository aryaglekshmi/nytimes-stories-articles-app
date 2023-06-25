import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NewsEffects } from './redux/news.effects';
import { NewsService } from './redux/news.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { newsReducer } from './redux/news.reducer';
import { LoaderComponent } from '../loader/loader.component';
import { NewsCardsComponent } from './news-cards/news-cards.component';
import { PageNavigationComponent } from '../page-navigation/page-navigation.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NewsComponent,
    LoaderComponent,
    NewsCardsComponent,
    PageNavigationComponent,
    SearchComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NewsRoutingModule,
    StoreModule.forFeature('ReducerForTopNews', newsReducer), // Configure the feature store
    EffectsModule.forFeature([NewsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: 'News Store' }), //maximum number of actions to keep in the history
  ],
  providers: [NewsService],
})
export class NewsModule {}
