import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

import { select, Store } from '@ngrx/store';
import { filter, Observable, of, take } from 'rxjs';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'course-app';

  isAuthorized$: Observable<boolean> = of(false);
  user$ = new Observable<fromUser.User>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized));
    this.user$ = this.store.pipe(select(fromUser.getUser));
    this.store.dispatch(fromUser.init());
    this.store
      .pipe(select(fromUser.getUserState))
      .pipe(
        filter((state) => !!state.uid),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(fromDictionaries.read());
      });
  }

  onSignOut(): void {
    this.store.dispatch(fromUser.signOut());
  }
}
