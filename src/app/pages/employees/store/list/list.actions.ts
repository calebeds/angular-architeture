import { createAction, props } from '@ngrx/store';
import { User } from './list.models';

export enum Types {
  READ = '[Employees] Read: Start',
  READ_SUCCESS = '[Employees] Read: Success',
  READ_ERROR = '[Employees] Read: Error',
}

export const read = createAction(Types.READ);
export const readSuccess = createAction(
  Types.READ_SUCCESS,
  props<{ items: User[] }>()
);
export const readError = createAction(
  Types.READ_ERROR,
  props<{ error: string }>()
);
