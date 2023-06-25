import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NewsService } from './news.service';
import * as NewsActions from './news.actions';
import { INYTimesStory } from '../news.interface';

@Injectable()
export class NewsEffects {
  fetchTopWorldNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.fetchTopWorldNews),
      mergeMap(() =>
        this.newsService.getTopWorldNews().pipe(
          map((news: INYTimesStory[]) =>
            NewsActions.fetchTopWorldNewsSuccess({ topWorldNews: news })
          ),
          catchError((error) =>
            of(NewsActions.fetchTopWorldNewsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  fetchTopScienceNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.fetchTopScienceNews),
      mergeMap(() =>
        this.newsService.getTopScienceNews().pipe(
          map((news: INYTimesStory[]) =>
            NewsActions.fetchTopScienceNewsSuccess({ topScienceNews: news })
          ),
          catchError((error) =>
            of(NewsActions.fetchTopScienceNewsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private newsService: NewsService) {}
}
