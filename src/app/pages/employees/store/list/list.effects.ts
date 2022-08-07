import { User } from './list.models';
import * as fromActions from './list.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { extractDocumentChangeActionData } from '@app/shared';

@Injectable()
export class ListEffects {
  constructor(private actions: Actions, private afs: AngularFirestore) {}

  read = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() => {
        return this.afs
          .collection<User>('users', (ref) =>
            ref.where('roleId', '==', 'employee')
          )
          .snapshotChanges()
          .pipe(
            take(1),
            map((changes) =>
              changes.map((x) => {
                return extractDocumentChangeActionData(x, false);
              })
            ),
            map((items) => fromActions.readSuccess({ items: items as User[] })),
            catchError((err) => of(fromActions.readError(err.message)))
          );
      })
    )
  );
}
