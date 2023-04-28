import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Loader, LoaderOptions} from 'google-maps';
import { SendGridService } from 'src/app/shared/services/sengrid/sendgrid.service';

import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  environment = environment;
  options: LoaderOptions = {
    /* todo */
  };
  loader = new Loader(
    environment.google.maps,
    this.options,
  );

  contactForm: FormGroup;
  isSubmitted = false;
  captchaResolved = false;

  /**
   * Creates an instance of ContactComponent.
   * @param {Title} _title
   * @memberof ContactComponent
   */
  constructor(private _title: Title, private _fb: FormBuilder, private _sendGridService: SendGridService) {
    this._title.setTitle('Contact - Chris Rodriguez');

    this.contactForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]],
      captcha: ['', Validators.required],
    });
  }

  /**
   * @memberof ContactComponent
   */
  ngOnInit() {
    this.initMap();
  }

  /**
   * @return {*}  {Promise<void>}
   * @memberof ContactComponent
   */
  async initMap(): Promise<void> {
    try {
      const M = await this.loader.load();
      this.map = new M.maps.Map(document.getElementById('map') as HTMLElement, {
        center: {lat: 34.0195, lng: -118.4912},
        zoom: 13,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        scrollwheel: false,
        gestureHandling: 'none',
        keyboardShortcuts: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{visibility: 'off'}],
          },
          {
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#242f3e',
              },
            ],
          },
          {
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#746855',
              },
            ],
          },
          {
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#242f3e',
              },
            ],
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#d59563',
              },
            ],
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#d59563',
              },
            ],
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#263c3f',
              },
            ],
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#6b9a76',
              },
            ],
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#38414e',
              },
            ],
          },
          {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#212a37',
              },
            ],
          },
          {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#9ca5b3',
              },
            ],
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#746855',
              },
            ],
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#1f2835',
              },
            ],
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#f3d19c',
              },
            ],
          },
          {
            'featureType': 'transit',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#2f3948',
              },
            ],
          },
          {
            'featureType': 'transit.station',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#d59563',
              },
            ],
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#17263c',
              },
            ],
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#515c6d',
              },
            ],
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#17263c',
              },
            ],
          },
        ],
      });
      this.marker = new M.maps.Marker({
        position: {lat: 34.0195, lng: -118.4912},
        map: this.map,
        title: 'I like to Code',
        icon: {
          url: './assets/png/marker.png',
          scaledSize: new M.maps.Size(35, 35),
        },
      });
    } catch (err) {
      console.error('Error initializing map:', err);
    };
  }

  /**
   * @param {string} captchaResponse
   * @memberof ContactComponent
   */
  resolved(captchaResponse: Event) {
    this.contactForm.patchValue({
      captcha: captchaResponse,
    });
  }

/**
 * @memberof ContactComponent
 */
onSubmit() {
  this.isSubmitted = true;
  if (this.contactForm.valid) {
    this.captchaResolved = true;
    const F = this.contactForm.get('firstName')?.value;
    const L = this.contactForm.get('lastName')?.value;
    const E = this.contactForm.get('email')?.value;
    const M = this.contactForm.get('message')?.value;

    this._sendGridService
      .sendEmail(F, L, E, M)
      .then(() => {
        this.contactForm.reset();
        this.isSubmitted = true;
        console.log('Email sent successfully!');
      })
      .catch((error) => {
        console.error(error);
        this.isSubmitted = false;
      });
  }
}
}
