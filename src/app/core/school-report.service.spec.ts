import { TestBed } from '@angular/core/testing';

import { SchoolReportService } from './school-report.service';

describe('SchoolReportService', () => {
  let service: SchoolReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
