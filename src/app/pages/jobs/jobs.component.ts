import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { FormComponent } from './components/form/form.component';
import * as fromList from './store/list';

import { Job } from './store/list';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent implements OnInit {
  jobs$ = new Observable<Job[]>();
  isEditable$ = new Observable<boolean>();

  constructor(public dialog: MatDialog, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.jobs$ = this.store.pipe(select(fromList.selectAll));
    this.isEditable$ = this.store.pipe(
      select(fromUser.getRoleId),
      map((roleId) => ['recruiter', 'employee'].includes(roleId))
    );

    this.store.dispatch(fromList.read());
  }

  onAdd(): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '220px',
      data: {},
    });
  }

  onEdit(value: Job): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '220px',
      data: { value },
    });
  }

  onDelete(id: string): void {
    this.store.dispatch(fromList.deleteJ({ id }));
  }
}
