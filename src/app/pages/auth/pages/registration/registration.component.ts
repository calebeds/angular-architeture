import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  regexErrors,
  markFormGroupTouched,
  validatorOptionsEmail,
  validatorOptionsPassword,
} from 'app/shared';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  regexErrors = regexErrors;
  loading$ = new Observable<boolean>();

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    this.form = this.fb.group(
      {
        email: [null, validatorOptionsEmail],
        password: [null, validatorOptionsPassword],
        passwordRepeat: [null, validatorOptionsPassword],
      },
      { validator: this.repeatPasswordValidator }
    );
  }

  private repeatPasswordValidator(group: FormGroup): {
    [key: string]: boolean;
  } | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return passwordRepeat?.value && password?.value !== passwordRepeat.value
      ? { repeat: true }
      : null;
  }

  onSubmit(): void {
    console.log(this.form.errors);
    if (this.form.valid) {
      const value = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password,
      };
      this.store.dispatch(fromUser.signUpEmail({ credentials }));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
