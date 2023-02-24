import { TestBed } from '@angular/core/testing';

import { LevelService } from './service/level.service';

describe('BookService', () => {
  let service: LevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
