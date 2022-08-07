import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import * as fromRoot from '@app/store/';
import * as fromUser from '@app/store/user/';
import * as fromProfileUser from '../../store/user/';
import {
  filter,
  map,
  Observable,
  switchMap,
  take,
  takeLast,
  takeUntil,
} from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent implements OnInit, OnDestroy {
  user$!: Observable<fromProfileUser.User>;
  isAuthorized$ = new Observable<boolean>();
  isOwnProfile$ = new Observable<boolean>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromProfileUser.getUser));
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized));

    this.isAuthorized$
      .pipe(
        filter((value) => value),
        switchMap(() => this.route.params)
      )
      .subscribe((params: Params) => {
        const id = params['id'];
        this.store.dispatch(fromProfileUser.read({ id }));
        this.isOwnProfile$ = this.store.pipe(
          select(fromUser.getUser),
          map((user) => user && user.uid === id)
        );
        this.user$.subscribe((user) => console.log('outside', user));
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(fromProfileUser.clear());
  }
}
