import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { filter, Observable, take, tap } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<fromUser.User> {
  constructor(private store: Store<fromRoot.State>) {}

  resolve(): Observable<fromUser.User> {
    return this.store.pipe(
      select(fromUser.getUser),
      tap((user) => {
        console.log('AQUI O RESOLVER:' + user.name);
      }),
      filter(
        (user) => user.roleId === 'employee' || user.roleId === 'recruiter'
      ),
      take(1)
    );
  }
}
