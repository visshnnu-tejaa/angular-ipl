import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.interface';

export const getAppState = createFeatureSelector<AppState>('app');

export const getMatches = createSelector(getAppState, (state) => state.matches);

export const getLoading = createSelector(getAppState, (state) => {
  return state.loading;
});

export const isLoggedIn = createSelector(getAppState, (state) => {
  return state.user ? true : false;
});

export const getError = createSelector(getAppState, (state) => state.error);
