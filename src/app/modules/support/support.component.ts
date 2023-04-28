import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { SubscriberService } from 'src/app/shared/services/subscribers/subscribers.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  subscribers = [];

  /**
   * Creates an instance of SupportComponent.
   * @param {Title} _title
   * @memberof SupportComponent
   */
  constructor(private _title: Title, private _subscriberService: SubscriberService) {
    this._title.setTitle('Sponsors - Chris Rodriguez');

    this._getSubscribers();
  }

  private async _getSubscribers() {
    this.subscribers = await this._subscriberService.getAllSubscribers();

    console.log(this.subscribers);
  }
}
