import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { environment } from '@src/environments/environment';
import { User } from './user.models';

import * as fromActions from './user.actions';

import { NotificationService } from '@app/services';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notifications: NotificationService
  ) {}

  signInEmail: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          switchMap((signInState) =>
            this.afs
              .doc<User>(`users/${signInState.user?.uid}`)
              .valueChanges()
              .pipe(
                take(1),
                map(
                  (user) =>
                    new fromActions.SignInEmailSuccess(
                      signInState.user!.uid,
                      user || ({} as any)
                    )
                )
              )
          ),
          catchError((err) => {
            this.notifications.error(err.message);
            return of(new fromActions.SignInEmailError(err.message));
          })
        )
      )
    );
  });

  signUpEmail: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          tap(() => {
            this.afAuth.currentUser.then((user) =>
              user?.sendEmailVerification(
                environment.firebase.actionCodeSettings
              )
            );
          }),
          map(
            (signUpState) =>
              new fromActions.SignUpEmailSuccess(signUpState.user!.uid)
          ),
          catchError((err) => {
            this.notifications.error(err.message);
            return of(new fromActions.SignUpEmailError(err.message));
          })
        )
      )
    );
  });

  signOut: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.SIGN_OUT),
    switchMap(() =>
      from(this.afAuth.signOut()).pipe(
        map(() => new fromActions.SignOutSuccess()),
        catchError((err) => of(new fromActions.SignOutError(err.message)))
      )
    )
  );
}
