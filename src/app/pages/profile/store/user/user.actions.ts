import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export enum Types {
  READ = '[Profile] [User] Read: Start',
  READ_SUCCESS = '[Profile] [User] Read: Success',
  READ_ERROR = '[Profile] [User] Read: Error',
  CLEAR = '[Profile] [User] Clear',
}

//Read
export const read = createAction(Types.READ, props<{ id: string }>());
export const readSuccess = createAction(
  Types.READ_SUCCESS,
  props<{ user: User }>()
);
export const readError = createAction(
  Types.READ_ERROR,
  props<{ error: string }>()
);

//Clear
export const clear = createAction(Types.CLEAR);
