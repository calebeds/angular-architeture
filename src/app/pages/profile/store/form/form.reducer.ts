import { createReducer, on } from '@ngrx/store';
import { PersonalForm } from '../../pages/form/components/personal/personal.component';
import { ProfessionalForm } from '../../pages/form/components/professional/professional.component';
import { ProfileForm } from './form.models';

import * as fromActions from './form.actions';

export type FormState = ProfileForm;

export const initialState: FormState = {
  personal: {} as PersonalForm,
  professional: {} as ProfessionalForm,
};

export const reducer = createReducer(
  initialState,
  on(fromActions.set, (state, { form }) => ({ ...state, ...form })),
  on(fromActions.update, (state, { changes }) => ({ ...state, ...changes })),
  on(fromActions.clear, (state) => ({ ...initialState }))
);
