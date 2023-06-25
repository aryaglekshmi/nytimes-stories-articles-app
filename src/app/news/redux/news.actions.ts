import { createAction, props } from '@ngrx/store';
import { INYTimesStory } from '../news.interface';

export const fetchTopWorldNews = createAction('[News] Fetch Top World News');

export const fetchTopWorldNewsFailure = createAction(
  '[News] Fetch Top World News Failure',
  props<{ error: string }>()
);

export const fetchTopWorldNewsSuccess = createAction(
  '[News] Fetch Top World News Success',
  props<{ topWorldNews: INYTimesStory[] }>()
);

export const fetchTopScienceNews = createAction(
  '[News] Fetch Top Science News'
);

export const fetchTopScienceNewsFailure = createAction(
  '[News] Fetch Top Science News Failure',
  props<{ error: string }>()
);

export const fetchTopScienceNewsSuccess = createAction(
  '[News] Fetch Top Science News Success',
  props<{ topScienceNews: INYTimesStory[] }>()
);
