import { createAction, props } from '@ngrx/store';
import {
  User,
  EmailPasswordCredentials,
  UserCreateRequest,
} from './user.models';

export enum Types {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGN_IN_EMAIL = '[User] Sign In with email: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Sign In with email: Sucess',
  SIGN_IN_EMAIL_ERROR = '[User] Sign In with email: Error',

  SIGN_UP_EMAIL = '[User] Sign Up with email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Sign Up with email: Sucess',
  SIGN_UP_EMAIL_ERROR = '[User] Sign Up with email: Error',

  SIGN_OUT = '[User] Sign Out: Start',
  SIGN_OUT_SUCCESS = '[User] Sign Out: Success',
  SIGN_OUT_ERROR = '[User] Sing Out: Error',

  CREATE = '[User] Create: Start',
  CREATE_SUCCESS = '[User] Create: Success',
  CREATE_ERROR = '[User] Create; Error ',

  UPDATE = '[User] Update: Start',
  UPDATE_SUCCESS = '[User] Update: Success',
  UPDATE_ERROR = '[User] Update: Error',
}

// // Sign In

// export class SignInEmail implements Action {
//   readonly type = Types.SIGN_IN_EMAIL;
//   constructor(public credentials: EmailPasswordCredentials) {}
// }

// export class SignInEmailSuccess implements Action {
//   readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
//   constructor(public uid: string, public user: User) {}
// }

// export class SignInEmailError implements Action {
//   readonly type = Types.SIGN_IN_EMAIL_ERROR;
//   constructor(public error: string) {}
// }

// // Sign up

// export class SignUpEmail implements Action {
//   readonly type = Types.SIGN_UP_EMAIL;
//   constructor(public credentials: EmailPasswordCredentials) {}
// }

// export class SignUpEmailSuccess implements Action {
//   readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
//   constructor(public uid: string) {}
// }

// export class SignUpEmailError implements Action {
//   readonly type = Types.SIGN_UP_EMAIL_ERROR;
//   constructor(public error: string) {}
// }

// // Sign Out

// export class SignOut implements Action {
//   readonly type = Types.SIGN_OUT;
//   constructor() {}
// }

// export class SignOutSuccess implements Action {
//   readonly type = Types.SIGN_OUT_SUCCESS;
//   constructor() {}
// }

// export class SignOutError implements Action {
//   readonly type = Types.SIGN_OUT_ERROR;
//   constructor(public error: string) {}
// }

// export type All =
//   | SignInEmail
//   | SignInEmailSuccess
//   | SignInEmailError
//   | SignUpEmail
//   | SignUpEmailSuccess
//   | SignUpEmailError
//   | SignOut
//   | SignOutSuccess
//   | SignOutError;

// Init

export const init = createAction(Types.INIT);

export const initAuthorized = createAction(
  Types.INIT_AUTHORIZED,
  props<{ uid: string; user: User }>()
);

export const initUnauthorized = createAction(Types.INIT_UNAUTHORIZED);

export const initError = createAction(
  Types.INIT_ERROR,
  props<{ error: string }>()
);

// Sign In

export const signInEmail = createAction(
  Types.SIGN_IN_EMAIL,
  props<{ credentials: EmailPasswordCredentials }>()
);

export const signInEmailSuccess = createAction(
  Types.SIGN_IN_EMAIL_SUCCESS,
  props<{ uid: string; user: User }>()
);

export const signInEmailError = createAction(
  Types.SIGN_IN_EMAIL_ERROR,
  props<{ error: string }>()
);

//Sign up

export const signUpEmail = createAction(
  Types.SIGN_UP_EMAIL,
  props<{ credentials: EmailPasswordCredentials }>()
);

export const signUpEmailSuccess = createAction(
  Types.SIGN_UP_EMAIL_SUCCESS,
  props<{ uid: string }>()
);

export const signUpEmailError = createAction(
  Types.SIGN_UP_EMAIL_ERROR,
  props<{ error: string }>()
);

//Sign out

export const signOut = createAction(Types.SIGN_OUT);

export const signOutSuccess = createAction(Types.SIGN_OUT_SUCCESS);

export const signOutError = createAction(
  Types.SIGN_OUT_ERROR,
  props<{ error: string }>()
);

export const create = createAction(
  Types.CREATE,
  props<{ user: UserCreateRequest }>()
);
export const createSuccess = createAction(
  Types.CREATE_SUCCESS,
  props<{ user: User }>()
);
export const createError = createAction(
  Types.CREATE_ERROR,
  props<{ error: string }>()
);

export const update = createAction(Types.UPDATE, props<{ user: User }>());
export const updateSuccess = createAction(
  Types.UPDATE_SUCCESS,
  props<{ user: User }>()
);
export const updateError = createAction(
  Types.UPDATE_ERROR,
  props<{ error: string }>()
);
