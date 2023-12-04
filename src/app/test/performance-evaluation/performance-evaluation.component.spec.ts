import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TeamsService } from '../../../app/services/teams/teams.service';
import { CurrentUser } from '../../../app/services/auth/current-user.interface';
import { PerformanceEvaluationService } from '../../../app/services/test/performance-evaluation.service';

import { PerformanceEvaluationComponent } from './performance-evaluation.component';

describe('PerformanceEvaluationComponent', () => {
  let component: PerformanceEvaluationComponent;
  let fixture: ComponentFixture<PerformanceEvaluationComponent>;
  const currentUser: CurrentUser = {
    names: "nombres",
    surnames: 'surnames',
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjN4QUhqaVFOVl9WbjctcXRTQWFVMyJ9.eyJpc3MiOiJodHRwczovL2FiYy1qb2JzLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjUyYWM2MjgxMzViNTFhMTMyNGE5Y2YxIiwiYXVkIjoiaHR0cDovL2FiYy1qb2JzLnVzZXJzLWFwaS5kZXYiLCJpYXQiOjE2OTc2Nzc4MTQsImV4cCI6MTY5Nzc2NDIxNCwiYXpwIjoicFdzWUtHRE02MGNkdERPd0FkR1p5VDlpcGlBY0hSNE4iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbInJlYWQ6bG9jYXRpb24iLCJyZWFkOnVzZXJzIiwicmVnaXN0ZXI6Y29tcGFueSJdfQ.rMSMjblwUb17nrOZNwQBzWF9cEpDs1Zntf6m6XehlfI_fcwi0Id-u0wFrXA5Ao1wL8iKRAWxcItTWRnm1kz38w4rfdXO-5-KHARgKqGXbuzcF-BXbsxxU7ZYol5wvgDrk8JJFjsO5M22J9DA4DLpGoORNQtAexa82bdLU4wTySXRW5v__hSDVDz10227CcM4UtNyKoLQ7TAL5BT3Lkc2Rozsa0AF9VRchBj2qMNJhAXF2I26_HSAytD_hfuVXktj3jHN4KaklpHIBJXmoENaSGJDA18Dgdi5IilE5x6jxVNWgcC3id5nuzatGI09YO2YFn9bEwQ0SQvpwv_fuugHPA',
    rol: "REPRESENTANTE_EMPRESA",
    company_id: "1"
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let mockPerformanceService: Partial<PerformanceEvaluationService>;

  beforeEach(async () => {
    mockPerformanceService = {
      registerPerformanceEval: jest.fn(),
      getDimensions: jest.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [PerformanceEvaluationComponent],
      imports: [HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: (lang: string) => {
                return of({
                  'evaluacion_desempenio_confirmacion': '¿Desea registrar la evaluacion de desempeño del candidato?',
                  'evaluacion_desempenio_correctamente': 'La evaluacion de desempeño del candidato se ha registrado correctamente',
                  'campos_incompletos': 'El formulario tiene campos obligatorios vacios'
                });
              }
            }
          }
        })],
      providers: [{ provide: PerformanceEvaluationService, useValue: mockPerformanceService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    (mockPerformanceService.getDimensions as jest.Mock).mockReturnValue(of(true));
    expect(component).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('evaluacion_desempenio_confirmacion');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea registrar la evaluacion de desempeño del candidato?');
  });

  it('should call registerPerformanceEval method of performanceEvalService when confirming modal', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('campos_incompletos');

    component.performance.setValue("Alto");
    component.observations.setValue("NA");
    component.projectId.setValue(1);
    component.teamId.setValue(1);
    component.dimensionId.setValue(1);
    component.user.id = 1;

    (mockPerformanceService.registerPerformanceEval as jest.Mock).mockReturnValue(of(true));

    component.confirmDialog(true);

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('El formulario tiene campos obligatorios vacios');
  });

  it('should handle confirmDialog with event false', () => {
    expect(component.confirmDialog(false)).toBeUndefined();
  });

  it('should handle closeModal with event true', () => {
    expect(component.closeModal(true)).toBeUndefined();
  });

  it('should call onChangeProject and populate teams', () => {
    const teamService = TestBed.inject(TeamsService);
    const teamsData = [{ id: 1, name: 'Team A' }];
    jest.spyOn(teamService, 'getTeamsByproject').mockReturnValue(of(teamsData));

    component.onChangeProject(1);
    expect(component.teamsOptions).toEqual(teamsData);
  });

  it('should call onChangeTeam and populate candidateOptions', () => {
    const teamService = TestBed.inject(TeamsService);
    const candidateData = [{ id: 1, name: 'Pedro', fullName: 'Pedro' }];
    jest.spyOn(teamService, 'getCandidateByTeam').mockReturnValue(of(candidateData));

    component.onChangeTeam(1);
    expect(component.candidateOptions).toEqual(candidateData);
  });

});
