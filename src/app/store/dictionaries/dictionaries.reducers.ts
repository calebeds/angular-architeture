import { Dictionaries } from './dictionaries.models';
import * as fromActions from './dictionaries.actions';

export interface DictionariesState {
  entities: Dictionaries;
  loading: boolean;
  error: string;
}

const initialState: DictionariesState = {
  entities: {} as any,
  loading: {} as any,
  error: {} as any,
};

export function reducer(
  state = initialState,
  action: fromActions.All
): DictionariesState {
  switch (action.type) {
    case fromActions.Types.READ: {
      return { ...state, loading: true, error: {} as any };
    }
    case fromActions.Types.READ_SUCCESS: {
      return { ...state, entities: action.dictionaries, loading: false };
    }

    case fromActions.Types.READ_ERROR: {
      return {
        ...state,
        entities: {} as any,
        loading: false,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
