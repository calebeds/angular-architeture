import { createAction, props } from '@ngrx/store';
import { Job, JobCreatedRequest } from './list.models';

export enum Types {
  READ = '[Jobs] Read: Start',
  READ_SUCCESS = '[Jobs] Read: Success',
  READ_ERROR = '[Jobs] Read: Error',

  CREATE = '[Jobs] Create: Start',
  CREATE_SUCCESS = '[Jobs] Create: Success',
  CREATE_ERROR = '[Jobs] Create: Error',

  UPDATE = '[Jobs] Update: Start',
  UPDATE_SUCCESS = '[Jobs] Update: Success',
  UPDATE_ERROR = '[Jobs] Update: Error',

  DELETE = '[Jobs] Delete: Start',
  DELETE_SUCCESS = '[Jobs] Delete: Success',
  DELETE_ERROR = '[Jobs] Delete: Error',
}

//Read

export const read = createAction(Types.READ);
export const readSuccess = createAction(
  Types.READ_SUCCESS,
  props<{ items: Job[] }>()
);
export const readError = createAction(
  Types.READ_ERROR,
  props<{ error: string }>()
);

//Create
export const create = createAction(
  Types.CREATE,
  props<{ job: JobCreatedRequest }>()
);
export const createSuccess = createAction(
  Types.CREATE_SUCCESS,
  props<{ job: Job }>()
);
export const createError = createAction(
  Types.CREATE_ERROR,
  props<{ error: string }>()
);

//Update

export const update = createAction(Types.UPDATE, props<{ job: Job }>());
export const updateSuccess = createAction(
  Types.UPDATE_SUCCESS,
  props<{ id: string; changes: Partial<Job> }>()
);
export const updateError = createAction(
  Types.UPDATE_ERROR,
  props<{ error: string }>()
);

//Delete
export const deleteJ = createAction(Types.DELETE, props<{ id: string }>());
export const deleteSuccess = createAction(
  Types.DELETE_SUCCESS,
  props<{ id: string }>()
);
export const deleteError = createAction(
  Types.DELETE_ERROR,
  props<{ error: string }>()
);
