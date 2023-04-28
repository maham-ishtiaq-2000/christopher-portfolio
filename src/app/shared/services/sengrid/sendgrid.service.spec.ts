import {TestBed} from '@angular/core/testing';

import {SendGridService} from './sendgrid.service';

describe('SendgridService', () => {
  let service: SendGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
