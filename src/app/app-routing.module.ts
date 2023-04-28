import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// PAGES
import {HomeComponent} from './modules/home/home.component';
import {SupportComponent} from './modules/support/support.component';
import {DonateComponent} from './modules/donate/donate.component';
import {ContactComponent} from './modules/contact/contact.component';
import {ProjectsComponent} from './modules/projects/projects.component';
import {ResumeComponent} from './modules/resume/resume.component';
import {ProjectComponent} from './modules/projects/project/project.component';

const R: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'projects', children: [
    {path: '', component: ProjectsComponent},
    {path: ':item', component: ProjectComponent},
  ]},
  {path: 'resume', component: ResumeComponent},
  {path: 'sponsors', component: SupportComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(R)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
