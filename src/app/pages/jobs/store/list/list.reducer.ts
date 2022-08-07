import * as fromActions from './list.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Job } from './list.models';
import { createReducer, on } from '@ngrx/store';

export const listAdapter = createEntityAdapter<Job>();

export interface ListState extends EntityState<Job> {
  loading: boolean;
  error: string;
}

export const initialState: ListState = listAdapter.getInitialState({
  loading: {} as any,
  error: {} as any,
});

export const reducer = createReducer(
  initialState,
  //read
  on(fromActions.read, (state) => ({ ...state, loading: true, error: '' })),
  on(fromActions.readSuccess, (state, { items }) => {
    return listAdapter.addMany(items, { ...state, loading: false });
  }),
  on(fromActions.readError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  //create
  on(fromActions.create, (state) => ({ ...state, loading: true, error: '' })),
  on(fromActions.createSuccess, (state, { job }) =>
    listAdapter.addOne(job, { ...state })
  ),
  on(fromActions.createError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  //update
  on(fromActions.update, (state) => ({ ...state, loading: true, error: '' })),
  on(fromActions.updateSuccess, (state, { id, changes }) =>
    listAdapter.updateOne({ id, changes }, { ...state })
  ),
  on(fromActions.updateError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  //delete
  on(fromActions.deleteJ, (state) => ({ ...state, loading: true, error: '' })),
  on(fromActions.deleteSuccess, (state, { id }) =>
    listAdapter.removeOne(id, { ...state })
  ),
  on(fromActions.deleteError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
