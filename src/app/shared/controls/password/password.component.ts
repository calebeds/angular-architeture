import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
  @Input()
  placeholder = '';

  @Output()
  changed = new EventEmitter<string>();

  value = '';
  isDisabled = false;
  passwordType: PasswordType = 'password';

  constructor() {
    this.passwordType = 'password';
  }

  ngOnInit(): void {}

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: unknown): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: unknown): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup($event: KeyboardEvent): void {
    const value = ($event.target as HTMLInputElement).value;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }

  togglePassword(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
