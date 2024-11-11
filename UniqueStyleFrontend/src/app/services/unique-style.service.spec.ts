import { TestBed } from '@angular/core/testing';

import { UniqueStyleService } from './unique-style.service';

describe('UniqueStyleService', () => {
  let service: UniqueStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
