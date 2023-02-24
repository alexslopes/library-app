import { TestBed } from '@angular/core/testing';

import { AdminLevelService } from './service/admin-level.service';

describe('AdminBookService', () => {
  let service: AdminLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
