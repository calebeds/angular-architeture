import { AbstractControlOptions, Validators } from '@angular/forms';
import { regex } from './regex';

export const validatorOptionsEmail: AbstractControlOptions = {
  updateOn: 'blur',
  validators: [
    Validators.required,
    Validators.maxLength(120),
    Validators.pattern(regex.email),
  ],
};

export const validatorOptionsRegPassword: AbstractControlOptions = {
  updateOn: 'blur',
  validators: [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(30),
    Validators.pattern(regex.password),
  ],
};
