import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { regex, regexErrors, markFormGroupTouched } from '@app/shared';

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
        email: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.maxLength(120),
              Validators.pattern(regex.email),
            ],
          },
        ],
        password: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(30),
              Validators.pattern(regex.password),
            ],
          },
        ],
        passwordRepeat: [
          null,
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(30),
              Validators.pattern(regex.password),
            ],
          },
        ],
      },
      { validator: this.repeatPasswordValidator }
    );
  }

  private repeatPasswordValidator(group: FormGroup): {
    [key: string]: boolean;
  } | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    console.log(password?.value);
    console.log(passwordRepeat?.value);

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
