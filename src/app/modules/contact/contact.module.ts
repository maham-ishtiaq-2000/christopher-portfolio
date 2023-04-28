import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactComponent} from './contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxCaptchaModule} from 'ngx-captcha';
import {HttpClientModule} from '@angular/common/http';
import { SendGridService } from 'src/app/shared/services/sengrid/sendgrid.service';

@NgModule({
  declarations: [
    ContactComponent,
  ],
  exports: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  providers: [
    SendGridService,
  ],
})
export class ContactModule { }
