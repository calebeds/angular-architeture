import { Component, OnInit } from '@angular/core';
import { pipe, Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  private destroy = new Subject<void>();

  constructor(private stepper: StepperService) {}

  ngOnInit(): void {
    this.stepper.check$
      .pipe(takeUntil(this.destroy))
      .subscribe((type: 'next' | 'complete') => {
        this.stepper[type].next(true);
      });
  }
}
