import { extractDocumentChangeActionData } from '@app/shared';
import { Job, JobCreatedRequest } from './list.models';
import * as fromActions from './list.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, from, map, of, switchMap, take } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';

@Injectable()
export class ListEffects {
  constructor(private actions: Actions, private afs: AngularFirestore) {}

  read = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.afs
          .collection('jobs', (ref) => ref.orderBy('created'))
          .snapshotChanges()
          .pipe(
            take(1),
            map((changes) =>
              changes.map((x) => extractDocumentChangeActionData(x))
            ),
            map((items) => fromActions.readSuccess({ items: items as Job[] })),
            catchError((err) => of(fromActions.readError(err.message)))
          )
      )
    )
  );

  create = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: { job: any }) => action.job),
      map((job: JobCreatedRequest) => ({ ...job, created: serverTimestamp() })),
      switchMap((request: JobCreatedRequest) =>
        from(this.afs.collection('jobs').add(request)).pipe(
          map((res) => ({ ...request, id: res.id })),
          map((job: Job) => fromActions.createSuccess({ job })),
          catchError((err) => of(fromActions.createError(err.message)))
        )
      )
    )
  );

  update = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.UPDATE),
      map((action: { job: any }) => action.job),
      map((job: Job) => ({ ...job, updated: serverTimestamp() })),
      switchMap((job) =>
        from(this.afs.collection('job').doc(job.id).set(job)).pipe(
          map(() => fromActions.updateSuccess({ id: job.id, changes: job })),
          catchError((err) => of(fromActions.updateError(err.message)))
        )
      )
    )
  );

  delete = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.DELETE),
      map((action: { id: string }) => action.id),
      switchMap((id) =>
        from(this.afs.collection('jobs').doc(id).delete()).pipe(
          map(() => fromActions.deleteSuccess({ id })),
          catchError((err) => of(fromActions.deleteError(err.message)))
        )
      )
    )
  );
}
