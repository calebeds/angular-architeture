import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs';

import * as fromActions from './user.actions';
import { User } from './user.models';

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private afs: AngularFirestore) {}

  read = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      tap((s: { id: string }) => console.log('id', s.toString())),
      switchMap((action: { id: string }) =>
        this.afs
          .doc<User>(`users/${action.id}`)
          .valueChanges()
          .pipe(
            take(1),
            tap((user) => console.log('The user', user)),
            map((user) => fromActions.readSuccess({ user: user as User })),
            catchError((err) => of(fromActions.readError(err.message)))
          )
      )
    )
  );
}
