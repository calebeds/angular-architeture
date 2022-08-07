import { User } from './user.models';

import * as fromActions from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface UserState {
  entity: User;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  entity: {} as any,
  loading: {} as any,
  error: {} as any,
};

export const reducer = createReducer(
  initialState,
  on(fromActions.read, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(fromActions.readSuccess, (state, { user }) => ({
    ...state,
    entity: user,
    loading: false,
  })),
  on(fromActions.readError, (state, { error }) => ({
    ...state,
    loading: true,
    error: error,
  })),
  on(fromActions.clear, (state) => ({
    ...initialState,
  }))
);
