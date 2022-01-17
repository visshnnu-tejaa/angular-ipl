import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { MatchService } from 'src/app/services/match.service';
import { UserService } from '../../services/user.service';
import {
  getMatchesRequest,
  getMatchesSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  setErrorMessage,
  setLoaderStatus,
} from './match.actions';

@Injectable()
export class MatchesEffect {
  constructor(
    private matchService: MatchService,
    private userService: UserService,
    private actions$: Actions,
    private store: Store,
    private router: Router
  ) {}

  loadMatches$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getMatchesRequest),
      exhaustMap((action) => {
        return this.matchService.getServices().pipe(
          map((matches) => {
            this.store.dispatch(setLoaderStatus({ status: false }));
            return getMatchesSuccess({ matches });
          })
        );
      })
    );
  });

  userRegister$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerUserRequest),
      mergeMap((action) => {
        return this.userService
          .registerUser({
            email: action.email,
            password: action.password,
            confirmPassword: action.confirmPassword,
          })
          .pipe(
            map((data) => {
              console.log(data);
              this.store.dispatch(setLoaderStatus({ status: false }));
              return registerUserSuccess();
            }),
            catchError((err) => {
              console.log(err);
              return of(loginUserFailure({ message: err.error.message }));
            })
          );
      })
    );
  });

  registerRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerUserSuccess),
        tap((action) => {
          console.log(123);
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

  userLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUserRequest),
      exhaustMap((action) => {
        return this.userService
          .loginUser({ email: action.email, password: action.password })
          .pipe(
            map((data: any) => {
              console.log(data);
              this.userService.setUserToLocalStorage(data);
              return loginUserSuccess({ user: data, redirect: true });
            }),
            catchError((err) => {
              console.log(err);
              return of(loginUserFailure({ message: err.error.message }));
            })
          );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginUserSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/home']);
          }
        })
      );
    },
    { dispatch: false }
  );

  userLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutUserRequest),
        map((action) => {
          this.userService.logout();
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );
}
