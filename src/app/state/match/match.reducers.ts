import { createReducer, on } from '@ngrx/store';
import { initalState } from '../app.initialState';
import {
  getMatchesSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  setErrorMessage,
  setLoaderStatus,
} from './match.actions';

const _matchReducer = createReducer(
  initalState,
  on(getMatchesSuccess, (state, payload) => {
    return {
      ...state,
      matches: payload.matches,
    };
  }),
  on(setLoaderStatus, (state, payload) => {
    return {
      ...state,
      loading: payload.status,
    };
  }),
  on(loginUserSuccess, (state, payload) => {
    return {
      ...state,
      user: payload.user,
    };
  }),
  on(loginUserRequest, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(loginUserFailure, (state, payload) => {
    return {
      ...state,
      error: payload.message,
    };
  }),
  on(setErrorMessage, (state, payload) => {
    return {
      ...state,
      error: payload.message,
    };
  }),
  on(registerUserSuccess, (state, payload) => {
    return {
      ...state,
    };
  }),
  on(registerUserFailure, (state, payload) => {
    return {
      ...state,
      error: payload.message,
    };
  })
);

export function matchReducer(state: any, action: any) {
  return _matchReducer(state, action);
}
