import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Period } from '@app/models/backend/user/roles/employee';

export interface ExperienceForm {
  companyName: string;
  period: Period;
}

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  @Input()
  public parent!: FormGroup;

  @Input()
  public name = '';

  @Input()
  public values: ExperienceForm[] | undefined;

  form = new FormArray([]);

  get experiences() {
    return (this.parent.controls[this.name] as FormArray)
      .controls as FormGroup[];
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.values = this.values ? this.values : [];
    this.init();
  }

  ngOnDestroy(): void {}

  private init(): void {
    this.form = this.fb.array([]);

    this.parent?.addControl(this.name, this.form);
  }

  private getFormGroupArray(values: ExperienceForm[]): FormGroup[] {
    if (!this.values?.length) {
      return [this.getFormGroup()];
    } else {
      return values.map((value: ExperienceForm) => this.getFormGroup(value));
    }
  }

  private getFormGroup(value?: ExperienceForm): FormGroup {
    const group = this.fb.group({
      companyName: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      period: [null, { updateOn: 'change', validators: [Validators.required] }],
    });

    if (value) {
      group.patchValue(value);
    }

    return group;
  }

  addExperience(): void {
    this.form.push(this.getFormGroup());
  }

  deleteExperience(i: number): void {
    this.form.removeAt(i);
  }
}
