import { TestBed } from '@angular/core/testing';

import { OpenPopService } from './open-pop.service';

describe('OpenPopService', () => {
  let service: OpenPopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenPopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
