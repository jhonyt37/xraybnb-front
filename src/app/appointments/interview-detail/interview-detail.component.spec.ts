import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewDetailComponent } from './interview-detail.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {DetailInterviewService} from "../../services/detail-interview/detail-interview.service";
import {of} from "rxjs";
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";

describe('InterviewDetailComponent', () => {
  let component: InterviewDetailComponent;
  let fixture: ComponentFixture<InterviewDetailComponent>;
  let mockDetailInterviewService: Partial<DetailInterviewService>;
  let activatedRouteMock: any;
  let translate: TranslateService;

  beforeEach(() => {
    mockDetailInterviewService = {
      getDetailInterview: jest.fn()
    };

    const routeParams = of({ id: '123' }); // Use RxJS 'of' to simulate an Observable
    activatedRouteMock = { params: routeParams };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })],
      declarations: [InterviewDetailComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }, { provide: DetailInterviewService, useValue: mockDetailInterviewService }]
    });
    fixture = TestBed.createComponent(InterviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should translate interview detail title', () => {
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', { 'resultado_entrevista': 'Resultado de entrevista' });
    translate.use('es');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#title_result_interview').textContent).toContain('Resultado de entrevista');
  });
});
