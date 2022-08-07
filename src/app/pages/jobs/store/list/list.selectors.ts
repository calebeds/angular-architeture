import { createSelector } from '@ngrx/store';
import { getJobsState, JobsState } from '..';
import { listAdapter } from './list.reducer';

export const getListState = createSelector(
  getJobsState,
  (state: JobsState) => state.list
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  listAdapter.getSelectors(getListState);

export const selectEntityById = createSelector(
  selectEntities,
  (entities: { [x: string]: any }, props: { id: string }) => entities[props.id]
);
