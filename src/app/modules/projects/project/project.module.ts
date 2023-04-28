import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectComponent} from './project.component';

@NgModule({
  declarations: [
    ProjectComponent,
  ],
  exports: [
    ProjectComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ProjectModule { }
