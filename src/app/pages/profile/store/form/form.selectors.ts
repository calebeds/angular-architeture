import { Form } from '@angular/forms';
import { createSelector } from '@ngrx/store';
import { getProfileState, ProfileState } from '..';
import { FormState } from './form.reducer';

export const getFormState = createSelector(
  getProfileState,
  (state: ProfileState) => state.form
);

export const getPersonalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.personal && state.personal
);

export const getProfessionalForm = createSelector(
  getFormState,
  (state: FormState) => !!state.professional && state.professional
);
