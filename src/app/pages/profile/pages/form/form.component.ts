import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from './components/stepper/services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(public stepper: StepperService) {}

  ngOnInit(): void {
    this.stepper.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);

    this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('Completed!');
    });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('Canceled!');
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
