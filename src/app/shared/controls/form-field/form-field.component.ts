import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  @Input()
  label = '';

  @Input()
  required = false;

  @Input()
  isInline = false;

  @Input()
  control!: AbstractControl;

  @Input()
  patternError = '';

  constructor() {
    this.isInline = true;
  }

  ngOnInit(): void {}

  hasError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey(): string {
    const errorKey =
      this.control &&
      this.control.errors &&
      Object.keys(this.control.errors)[0];
    return errorKey ? <string>errorKey : '';
  }
}
