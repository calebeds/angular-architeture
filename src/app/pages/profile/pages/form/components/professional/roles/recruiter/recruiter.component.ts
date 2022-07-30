import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from '@app/store/dictionaries';
import { EmployeeForm } from '../employee/employee.component';

export interface RecruiterForm {
  companyName: string;
  employeesCount: number;
}

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss'],
})
export class RecruiterComponent implements OnInit, OnDestroy {
  @Input()
  parent!: FormGroup;

  @Input()
  name = '';

  @Input()
  dictionaries!: Dictionaries | null;

  @Input()
  value!: RecruiterForm | EmployeeForm | undefined;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      companyName: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      employeesCount: [
        null,
        { updateOn: 'blur', validators: [Validators.required] },
      ],
    });
    if (this.value) {
      this.form.patchValue(this.value);
    }
    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }
}
