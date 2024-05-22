import { TestBed } from '@angular/core/testing';

import { DataCardService } from './dataCard.service';

describe('DataCardService', () => {
  let service: DataCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
