import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from './projects.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProjectModule} from './project/project.module';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProjectsComponent,
  ],
  exports: [
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ProjectModule,
  ],
})
export class ProjectsModule { }
