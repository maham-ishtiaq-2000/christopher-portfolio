import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// FIREBASE
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAnalyticsModule} from '@angular/fire/compat/analytics';
import {AngularFirePerformanceModule, PerformanceMonitoringService} from '@angular/fire/compat/performance';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SupportModule} from './modules/support/support.module';
import {DonateModule} from './modules/donate/donate.module';
import {ContactModule} from './modules/contact/contact.module';
import {HeaderModule} from './shared/header/header.module';
import {FooterModule} from './shared/footer/footer.module';
import {HomeModule} from './modules/home/home.module';
import {ProjectsModule} from './modules/projects/projects.module';

import {environment} from 'src/environments/environment';
import {ResumeModule} from './modules/resume/resume.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    SupportModule,
    DonateModule,
    ContactModule,
    ResumeModule,
    HomeModule,
    ProjectsModule,
    HeaderModule,
    FooterModule,
  ],
  providers: [
    PerformanceMonitoringService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
