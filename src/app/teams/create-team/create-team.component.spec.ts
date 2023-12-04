import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CurrentUser } from 'src/app/services/auth/current-user.interface';
import { TeamsService } from 'src/app/services/teams/teams.service';

import { CreateTeamComponent } from './create-team.component';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  const currentUser: CurrentUser = {
    names: "nombres",
    surnames: 'surnames',
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjN4QUhqaVFOVl9WbjctcXRTQWFVMyJ9.eyJpc3MiOiJodHRwczovL2FiYy1qb2JzLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjUyYWM2MjgxMzViNTFhMTMyNGE5Y2YxIiwiYXVkIjoiaHR0cDovL2FiYy1qb2JzLnVzZXJzLWFwaS5kZXYiLCJpYXQiOjE2OTc2Nzc4MTQsImV4cCI6MTY5Nzc2NDIxNCwiYXpwIjoicFdzWUtHRE02MGNkdERPd0FkR1p5VDlpcGlBY0hSNE4iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbInJlYWQ6bG9jYXRpb24iLCJyZWFkOnVzZXJzIiwicmVnaXN0ZXI6Y29tcGFueSJdfQ.rMSMjblwUb17nrOZNwQBzWF9cEpDs1Zntf6m6XehlfI_fcwi0Id-u0wFrXA5Ao1wL8iKRAWxcItTWRnm1kz38w4rfdXO-5-KHARgKqGXbuzcF-BXbsxxU7ZYol5wvgDrk8JJFjsO5M22J9DA4DLpGoORNQtAexa82bdLU4wTySXRW5v__hSDVDz10227CcM4UtNyKoLQ7TAL5BT3Lkc2Rozsa0AF9VRchBj2qMNJhAXF2I26_HSAytD_hfuVXktj3jHN4KaklpHIBJXmoENaSGJDA18Dgdi5IilE5x6jxVNWgcC3id5nuzatGI09YO2YFn9bEwQ0SQvpwv_fuugHPA',
    rol: "REPRESENTANTE_EMPRESA",
    company_id: "1"
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let mockTeamService: Partial<TeamsService>;

  beforeEach(async () => {
    mockTeamService = {
      createTeam: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ CreateTeamComponent ],
      imports: [HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: (lang: string) => {
                return of({
                  'crear_equipo_confirmacion': '¿Desea crear el equipo de trabajo?',
                  'evaluacion_desempenio_correctamente': 'La evaluacion de desempeño del candidato se ha registrado correctamente',
                  'campos_incompletos': 'El formulario tiene campos obligatorios vacios'
                });
              }
            }
          }
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('crear_equipo_confirmacion');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea crear el equipo de trabajo?');
  });

  it('should call registerPerformanceEval method of performanceEvalService when confirming modal', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('campos_incompletos');

    component.projectId.setValue(1);
    component.name.setValue("equipo nuevo");
    component.status.setValue("Activo");

    (mockTeamService.createTeam as jest.Mock).mockReturnValue(of(true));

    component.confirmDialog(true);

    expect(component.dataModal.displayModal).toBe(false);
    expect(component.dataModal.textModal).toBe('El formulario tiene campos obligatorios vacios');
  });

  it('should handle confirmDialog with event false', () => {
    expect(component.confirmDialog(false)).toBeUndefined();
  });

  it('should handle closeModal with event true', () => {
    expect(component.closeModal(true)).toBeUndefined();
  });

});
