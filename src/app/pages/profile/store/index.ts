import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromForm from './form/form.reducer';
import { UserEffects } from './user/user.effects';

import * as fromUser from './user/user.reducer';

export interface ProfileState {
  form: fromForm.FormState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<ProfileState> = {
  form: fromForm.reducer,
  user: fromUser.reducer,
};

export const effects: any[] = [UserEffects];

export const getProfileState = createFeatureSelector<ProfileState>('profile');
