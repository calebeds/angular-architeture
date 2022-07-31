import { User } from './user.models';
import * as fromActions from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface UserState {
  entity: User;
  uid: string;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  entity: {} as any,
  uid: '',
  loading: false,
  error: '',
};

// export function reducer(
//   state = initialState,
//   action: fromActions.All
// ): UserState {
//   switch (action.type) {
//     //Sign in

//     case fromActions.Types.SIGN_IN_EMAIL: {
//       return { ...state, loading: true };
//     }
//     case fromActions.Types.SIGN_IN_EMAIL_SUCCESS: {
//       return {
//         ...state,
//         entity: action.user,
//         uid: action.uid,
//         loading: false,
//         error: '',
//       };
//     }

//     case fromActions.Types.SIGN_IN_EMAIL_ERROR: {
//       return { ...state, error: action.error, loading: false };
//     }

//     // Sign Up
//     case fromActions.Types.SIGN_UP_EMAIL: {
//       return { ...state, loading: true };
//     }

//     case fromActions.Types.SIGN_UP_EMAIL_SUCCESS: {
//       return { ...state, uid: action.uid, loading: false };
//     }

//     case fromActions.Types.SIGN_UP_EMAIL_ERROR: {
//       return { ...state, error: action.error, loading: true };
//     }

//     // Sign Out

//     case fromActions.Types.SIGN_OUT: {
//       return { ...state, loading: true };
//     }

//     case fromActions.Types.SIGN_OUT_SUCCESS: {
//       return { ...initialState };
//     }

//     case fromActions.Types.SIGN_OUT_ERROR: {
//       return { ...state, error: action.error, loading: false };
//     }

//     default: {
//       return state;
//     }
//   }
// }

export const reducer = createReducer(
  initialState,
  on(fromActions.init, (state) => ({ ...state, loading: true })),
  on(fromActions.initAuthorized, (state, { user, uid }) => ({
    ...state,
    entity: user,
    uid: uid,
    loading: false,
    error: '',
  })),
  on(fromActions.initUnauthorized, (state) => ({
    ...state,
    entity: {} as any,
    loading: false,
    error: '',
  })),
  on(fromActions.initError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  //Sign in

  on(fromActions.signInEmail, (state) => ({ ...state, loading: true })),
  on(fromActions.signInEmailSuccess, (state, { user, uid }) => ({
    ...state,
    entity: user,
    uid: uid,
    loading: false,
    error: '',
  })),
  on(fromActions.signInEmailError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  //Sign up

  on(fromActions.signUpEmail, (state) => ({ ...state, loading: true })),
  on(fromActions.signUpEmailSuccess, (state, { uid }) => ({
    ...state,
    uid: uid,
    loading: false,
  })),
  on(fromActions.signUpEmailError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  //Sign out

  on(fromActions.signOut, (state) => ({ ...state, loading: true })),
  on(fromActions.signOutSuccess, (state) => ({ ...initialState })),
  on(fromActions.signOutError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  //Create

  on(fromActions.create, (state) => ({ ...state, loading: true, error: '' })),
  on(fromActions.createSuccess, (state, { user }) => ({
    ...state,
    entity: user,
    loading: false,
  })),
  on(fromActions.createError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  //Update

  on(fromActions.update, (state) => ({ ...state, loading: true, error: '' })),
  on(fromActions.updateSuccess, (state, { user }) => ({
    ...state,
    entity: user,
    loading: false,
  })),
  on(fromActions.updateError, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
