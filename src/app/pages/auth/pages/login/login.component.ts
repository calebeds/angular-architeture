import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  markFormGroupTouched,
  regexErrors,
  validatorOptionsEmail,
} from '@app/shared';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loading$ = of(false);

  form!: FormGroup;
  regexErrors = regexErrors;

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));
    this.form = this.fb.group({
      email: [null, validatorOptionsEmail],
      password: [
        null,
        { updateOn: 'change', validators: [Validators.required] },
      ],
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password,
      };

      this.store.dispatch(fromUser.signInEmail({ credentials }));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
