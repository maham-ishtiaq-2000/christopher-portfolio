import { HttpClient } from '@angular/common/http';
import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  experience: any[] = [];
  technologies: any[] = [];

  /**
   * Creates an instance of ResumeComponent.
   * @param {Title} _title
   * @memberof ResumeComponent
   */
  constructor(private _title: Title, private _http: HttpClient) {
    this._title.setTitle('Resume - Chris Rodriguez');

    this._getResume();
  }

  private async _getResume() {
    const result = await firstValueFrom(this._http.get<any[]>('./assets/json/resume.json'));

    if (result !== undefined) {
      this.experience = result[0].experience;
      this.technologies = result[0].technologies;
    }
  }
}
