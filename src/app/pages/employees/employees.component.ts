import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './store/list';

import * as fromRoot from '@app/store';
import * as fromList from './store/list';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees$ = new Observable<User[]>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.employees$ = this.store.pipe(select(fromList.getItems));

    this.store.dispatch(fromList.read());
  }
}
