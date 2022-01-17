import { createAction, props } from '@ngrx/store';
import { User } from '../user/user.interface';
import {
  GET_MATCHES_FAILURE,
  GET_MATCHES_REQUEST,
  GET_MATCHES_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SET_ERROR_MESSAGE,
  SET_LOADER_STATUS,
} from './match.constants';

export const getMatchesRequest = createAction(GET_MATCHES_REQUEST);
export const getMatchesSuccess = createAction(
  GET_MATCHES_SUCCESS,
  props<{ matches: any }>()
);

export const setLoaderStatus = createAction(
  SET_LOADER_STATUS,
  props<{ status: boolean }>()
);

export const registerUserRequest = createAction(
  REGISTER_USER_REQUEST,
  props<{ email: string; password: string; confirmPassword: string }>()
);
export const registerUserSuccess = createAction(REGISTER_USER_SUCCESS);

export const registerUserFailure = createAction(
  GET_MATCHES_FAILURE,
  props<{ message: string }>()
);

export const loginUserRequest = createAction(
  LOGIN_USER_REQUEST,
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  LOGIN_USER_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);
export const loginUserFailure = createAction(
  LOGIN_USER_SUCCESS,
  props<{ message: string }>()
);

export const logoutUserRequest = createAction(LOGOUT_USER_REQUEST);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);
