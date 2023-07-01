import { Action, createReducer, on } from '@ngrx/store';
import * as NewsActions from './news.actions';
import { INewsState } from '../news.interface';

export const initialState: INewsState = {
  ReducerForTopNews: {
    isLoading: false,
    topWorldNewsList: [],
    error: null,
    topScienceNewsList: [],
  },
};

export const newsReducer = createReducer(
  initialState,
  on(NewsActions.fetchTopWorldNews, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(NewsActions.fetchTopWorldNewsSuccess, (state, { topWorldNews }) => ({
    ...state,
    isLoading: false,
    topWorldNewsList: topWorldNews,
  })),
  on(NewsActions.fetchTopWorldNewsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(NewsActions.fetchTopScienceNews, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(NewsActions.fetchTopScienceNewsSuccess, (state, { topScienceNews }) => ({
    ...state,
    isLoading: false,
    topScienceNewsList: topScienceNews,
  })),
  on(NewsActions.fetchTopScienceNewsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
