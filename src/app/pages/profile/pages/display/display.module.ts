import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './display.component';
import { UserPhotoModule } from '@app/shared';

@NgModule({
  declarations: [DisplayComponent],
  imports: [CommonModule, DisplayRoutingModule, UserPhotoModule],
})
export class DisplayModule {}
