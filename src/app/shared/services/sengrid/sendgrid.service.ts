import {Injectable} from '@angular/core';
// eslint-disable-next-line camelcase
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendGridService {
  private _recipient: string = environment.google.recipient;
  private _sendGridApiUrl = 'https://api.sendgrid.com/v3/mail/send';

  /**
   * Creates an instance of GmailService.
   * @memberof SendGridService
   */
  constructor(private _http: HttpClient) {
  }

  /**
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} message
   * @param {string} [recipient]
   * @return {*}  {Promise<void>}
   * @memberof SendGridService
   */
  async sendEmail(firstName: string, lastName: string, email: string, message: string): Promise<void> {
    const P = {
      personalizations: [
        {
          to: [{email: this._recipient}],
        },
      ],
      from: {
        email,
        name: `${firstName} ${lastName}`,
      },
      subject: 'Portfolio Contact Request',
      content: [
        {
          type: 'text/plain',
          value: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
        },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.sendgrid}`,
    });

    try {
      await firstValueFrom(this._http.post(this._sendGridApiUrl, P, {headers}));
      console.log('Email sent successfully');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
