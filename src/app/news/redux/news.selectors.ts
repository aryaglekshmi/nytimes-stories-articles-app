import { createSelector } from '@ngrx/store';
import { INewsState } from '../news.interface';

export const selectFeature = (state: INewsState) => state;

export const newsSelector = createSelector(selectFeature, (state) => state);
