import { TestBed } from '@angular/core/testing';

import { DetailInterviewService } from './detail-interview.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DetailInterviewService', () => {
  let service: DetailInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DetailInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
