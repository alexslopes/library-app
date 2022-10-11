import { TestBed } from '@angular/core/testing';

import { AdminBookService } from './service/admin-book.service';

describe('AdminBookService', () => {
  let service: AdminBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
