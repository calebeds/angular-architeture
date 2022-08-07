import { User } from './list.models';
import * as fromActions from './list.actions';
import { createReducer, on } from '@ngrx/store';

export interface ListState {
  items: User[];
  loading: boolean;
  error: string;
}

export const initialState: ListState = {
  items: {} as any,
  loading: {} as any,
  error: {} as any,
};

export const reducer = createReducer(
  initialState,
  on(fromActions.read, (state) => ({ ...state, loading: true, error: '' })),
  on(fromActions.readSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(fromActions.readError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
