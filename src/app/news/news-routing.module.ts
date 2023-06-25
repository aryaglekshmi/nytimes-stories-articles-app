import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { UserSelectCardsComponent } from '../user-select-cards/user-select-cards.component';
import { SearchComponent } from '../search/search.component';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

const routes: Routes = [
  { path: '', component: UserSelectCardsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'newsDetails', component: NewsDetailsComponent },
  { path: 'articleDetails', component: ArticleDetailsComponent },
  { path: 'searchArticle', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
