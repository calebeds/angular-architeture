import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regexErrors } from '@app/shared';
import { Dictionaries } from '@app/store/dictionaries';
import { of, Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';
import { EmployeeForm } from './roles/employee/employee.component';
import { RecruiterForm } from './roles/recruiter/recruiter.component';

export interface ProfessionalForm {
  about: string;
  roleId: string;
  role: RecruiterForm | EmployeeForm;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  @Input()
  value!: ProfessionalForm | undefined;

  @Input()
  dictionaries!: Dictionaries | null;

  @Output()
  changed = new EventEmitter<ProfessionalForm>();

  form!: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      roleId: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      about: [null],
    });

    if (this.value) {
      this.form.patchValue(this.value);
    }

    this.stepper.check$
      .pipe(takeUntil(this.destroy))
      .subscribe((type: 'next' | 'complete') => {
        if (this.form.invalid) {
          markFormGroupTouched(this.form);
          this.form.updateValueAndValidity(this.form.value);
          this.cdr.detectChanges();
        } else {
        }
        this.stepper[type].next(this.form.valid);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
