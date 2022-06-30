import { createAction, props } from '@ngrx/store';
import { Dictionaries } from './dictionaries.models';

export enum Types {
  READ = '[Dictionaries] Read: Start',
  READ_SUCCESS = '[Dictionaries] Read: Success',
  READ_ERROR = '[Dictionaries] Read: Error',
}

// export class Read implements Action {
//   readonly type = Types.READ;
//   constructor() {}
// }

// export class ReadSuccess implements Action {
//   readonly type = Types.READ_SUCCESS;
//   constructor(public dictionaries: Dictionaries) {}
// }

// export class ReadError implements Action {
//   readonly type = Types.READ_ERROR;
//   constructor(public error: string) {}
// }

// export type All = Read | ReadSuccess | ReadError;

export const read = createAction(Types.READ);
export const readSuccess = createAction(
  Types.READ_SUCCESS,
  props<{ dictionaries: Dictionaries }>()
);
export const readError = createAction(
  Types.READ_ERROR,
  props<{ error: string }>()
);
