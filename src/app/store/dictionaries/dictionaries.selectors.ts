import { createSelector, createFeatureSelector } from '@ngrx/store';

import { DictionariesState } from './dictionaries.reducers';

export const getDictionaryState =
  createFeatureSelector<DictionariesState>('dictionaries');

export const getDictionaries = createSelector(
  getDictionaryState,
  (state) => state.entities
);

export const getLoading = createSelector(
  getDictionaryState,
  (state) => state.loading
);

export const getIsReady = createSelector(
  getDictionaryState,
  (state) => state.entities && !state.loading
);

export const getRoles = createSelector(getDictionaries, (state) => state.roles);

export const getQualifications = createSelector(
  getDictionaries,
  (state) => state.qualifications
);

export const getSpecializations = createSelector(
  getDictionaries,
  (state) => state.specializations
);

export const getSkills = createSelector(
  getDictionaries,
  (state) => state.skills
);
