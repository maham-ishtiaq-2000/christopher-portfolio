import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SupportComponent} from './support.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SupportComponent,
  ],
  exports: [
    SupportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class SupportModule { }
