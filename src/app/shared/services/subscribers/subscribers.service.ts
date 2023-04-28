import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private readonly apiUrl = environment.firebase.api;

  constructor(private http: HttpClient) {}

  async getAllSubscribers(): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiUrl}/getActiveSponsors`).toPromise();
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}