import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { environment } from '@src/environments/environment';
import { EmailPasswordCredentials, User } from './user.models';

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

// type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notifications: NotificationService
  ) {}

  signInEmail = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      map(
        (action: { credentials: EmailPasswordCredentials; user: User }) =>
          action.credentials
      ),
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
                map((user) =>
                  fromActions.signInEmailSuccess({
                    uid: signInState.user!.uid,
                    user: user || ({} as any),
                  })
                )
              )
          ),
          catchError((err) => {
            this.notifications.error(err.message);
            return of(fromActions.signInEmailError(err.message));
          })
        )
      )
    );
  });

  signUpEmail = createEffect(() => {
    return this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map(
        (action: { credentials: EmailPasswordCredentials }) =>
          action.credentials
      ),
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
          map((signUpState) =>
            fromActions.signUpEmailSuccess({ uid: signUpState.user!.uid })
          ),
          catchError((err) => {
            this.notifications.error(err.message);
            return of(fromActions.signUpEmailError(err.message));
          })
        )
      )
    );
  });

  signOut = this.actions.pipe(
    ofType(fromActions.Types.SIGN_OUT),
    switchMap(() =>
      from(this.afAuth.signOut()).pipe(
        map(() => fromActions.signOutSuccess()),
        catchError((err) => of(fromActions.signOutError(err.message)))
      )
    )
  );
}
