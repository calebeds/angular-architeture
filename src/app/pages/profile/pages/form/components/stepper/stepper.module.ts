import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import { StepperService } from './services';

@NgModule({
  declarations: [StepperComponent],
  imports: [CommonModule],
  exports: [StepperComponent],
  providers: [StepperService],
})
export class StepperModule {}
