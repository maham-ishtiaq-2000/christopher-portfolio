import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
  constructor(private _title: Title) {
    this._title.setTitle('Donate - Chris Rodriguez');
  }
}
