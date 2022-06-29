import { Action } from '@ngrx/store';
import { User, EmailPasswordCredentials } from './user.models';

export enum Types {
  SIGN_IN_EMAIL = '[User] Sign In with email: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Sign In with email: Sucess',
  SIGN_IN_EMAIL_ERROR = '[User] Sign In with email: Error',

  SIGN_UP_EMAIL = '[User] Sign Up with email: Start',
  SIGN_UP_EMAIL_SUCESS = '[User] Sign Up with email: Sucess',
  SIGN_UP_EMAIL_ERROR = '[User] Sign Up with email: Error',

  SIGN_OUT = '[User] Sign Out: Start',
  SIGN_OUT_SUCCESS = '[User] Sign Out: Success',
  SIGN_OUT_ERROR = '[User] Sing Out: Error',
}

// Sign In

export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) {}
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
  constructor(public uid: string, public user: User) {}
}

export class SignInEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_ERROR;
  constructor(public error: string) {}
}

// Sign up

export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;
  constructor(credentials: EmailPasswordCredentials) {}
}

export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCESS;
  constructor(public uid: string) {}
}

export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
  constructor(public error: string) {}
}

// Sign Out

export class SignOut implements Action {
  readonly type = Types.SIGN_OUT;
  constructor() {}
}

export class SignOutSuccess implements Action {
  readonly type = Types.SIGN_OUT_SUCCESS;
  constructor() {}
}

export class SignOutError implements Action {
  readonly type = Types.SIGN_OUT_ERROR;
  constructor(public error: string) {}
}

export type All =
  | SignInEmail
  | SignInEmailSuccess
  | SignInEmailError
  | SignUpEmail
  | SignUpEmailSuccess
  | SignUpEmailError
  | SignOut
  | SignOutSuccess
  | SignOutError;
