import { createAction, props } from '@ngrx/store';
import { ProfileForm } from './form.models';

export enum Types {
  SET = '[Profile] [Form] Set',
  UPDATE = '[Profile] [Form] Update',
  CLEAR = '[Profile] [Form] Clear',
}

export const set = createAction(Types.SET, props<{ form: ProfileForm }>());
export const update = createAction(
  Types.UPDATE,
  props<{ changes: Partial<ProfileForm> }>()
);
export const clear = createAction(Types.CLEAR);
