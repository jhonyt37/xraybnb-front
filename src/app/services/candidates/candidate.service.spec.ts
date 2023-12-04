import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CandidateService } from './candidate.service';


describe('CandidateService', () => {
  let service: CandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
