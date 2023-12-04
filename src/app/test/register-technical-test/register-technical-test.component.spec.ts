import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTechnicalTestComponent } from './register-technical-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { CandidateService } from '../../services/candidates/candidate.service';
import { TechnicalTestService } from '../../services/test/technical-test.service';

describe('RegisterTechnicalTestComponent', () => {
  let component: RegisterTechnicalTestComponent;
  let fixture: ComponentFixture<RegisterTechnicalTestComponent>;
  let translate: TranslateService;
  let candidateService: CandidateService
  let technicalTestService: TechnicalTestService
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTechnicalTestComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, DropdownModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: (lang: string) => {
                return of({ 'confirma_registar_resultados_prueba_tecnica': '¿Desea registrar el resultado de una prueba técnica?' });
              }
            }
          },
        })],
      providers: [CandidateService, TechnicalTestService]
    });
    fixture = TestBed.createComponent(RegisterTechnicalTestComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    candidateService = TestBed.inject(CandidateService);
    technicalTestService = TestBed.inject(TechnicalTestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call confirmModal and set dataModal on success', () => {
    const testFormValue = {
      observations: 'Observation',
      qualification: 90,
      candidate: 1,
      state: 'Pass',
      technicalTest: 2
    };

    const mockResponse = true;
    jest.spyOn(technicalTestService, 'registerResultTechnicalTest').mockReturnValue(of(mockResponse));

    component.registerTechnicalTest.setValue(testFormValue);

    component.confirmModal(true);

    expect(component.dataModal.displayModal).toBe(true);
  });

  it('should call confirmModal and set dataModal on error with status 400', () => {
    const testFormValue = {
      observations: 'Observation',
      qualification: 90,
      candidate: 1,
      state: 'Pass',
      technicalTest: 2
    };

    const mockError = {
      status: 400,
      error: { message: 'Validation error' }
    };

    jest.spyOn(technicalTestService, 'registerResultTechnicalTest').mockReturnValue(throwError(mockError));

    component.registerTechnicalTest.setValue(testFormValue);

    component.confirmModal(true);

    expect(component.dataModal.displayModal).toBe(true);
  });

  it('should call confirmModal and set dataModal on generic error', () => {
    const testFormValue = {
      observations: 'Observation',
      qualification: 90,
      candidate: 1,
      state: 'Pass',
      technicalTest: 2
    };

    const mockError = { status: 500 };
    jest.spyOn(technicalTestService, 'registerResultTechnicalTest').mockReturnValue(throwError(mockError));

    component.registerTechnicalTest.setValue(testFormValue);

    component.confirmModal(true);

    expect(component.dataModal.displayModal).toBe(true);
  });

  it('should call confirmModal and set dataModal on success', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('campos_incompletos');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea registrar el resultado de una prueba técnica?');
  });

  it('should call getCandidate and set candidateOptions', () => {
    const mockCandidates = [{ testID: 1, users: { id: 1, names: 'John', surnames: 'Doe', totalName: 'John Doe' } }];
    const candidate = [{ id: 1, names: 'John', surnames: 'Doe', totalName: 'John Doe' }]
    jest.spyOn(candidateService, 'getTestCandidates').mockReturnValue(of(mockCandidates));
    component.getCandidate(1);

    expect(component.candidateOptions).toEqual(candidate);
  });

  it('should call closeModal and clear the form', () => {
    component.closeModal(true);
    expect(component.clearForm()).toBeUndefined();
  });

});

