import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { TeamsService } from '../../../app/services/teams/teams.service';
import { CurrentUser } from '../../../app/services/auth/current-user.interface';
import { SessionService } from '../../../app/services/auth/session.service';

import { AddCandidateTeamComponent } from './add-candidate-team.component';

describe('AddCandidateTeamComponent', () => {
  let component: AddCandidateTeamComponent;
  let fixture: ComponentFixture<AddCandidateTeamComponent>;
  let mockTeamService: Partial<TeamsService>;

  const currentUser: CurrentUser = {
    names: "nombres",
    surnames: 'surnames',
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjN4QUhqaVFOVl9WbjctcXRTQWFVMyJ9.eyJpc3MiOiJodHRwczovL2FiYy1qb2JzLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjUyYWM2MjgxMzViNTFhMTMyNGE5Y2YxIiwiYXVkIjoiaHR0cDovL2FiYy1qb2JzLnVzZXJzLWFwaS5kZXYiLCJpYXQiOjE2OTc2Nzc4MTQsImV4cCI6MTY5Nzc2NDIxNCwiYXpwIjoicFdzWUtHRE02MGNkdERPd0FkR1p5VDlpcGlBY0hSNE4iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbInJlYWQ6bG9jYXRpb24iLCJyZWFkOnVzZXJzIiwicmVnaXN0ZXI6Y29tcGFueSJdfQ.rMSMjblwUb17nrOZNwQBzWF9cEpDs1Zntf6m6XehlfI_fcwi0Id-u0wFrXA5Ao1wL8iKRAWxcItTWRnm1kz38w4rfdXO-5-KHARgKqGXbuzcF-BXbsxxU7ZYol5wvgDrk8JJFjsO5M22J9DA4DLpGoORNQtAexa82bdLU4wTySXRW5v__hSDVDz10227CcM4UtNyKoLQ7TAL5BT3Lkc2Rozsa0AF9VRchBj2qMNJhAXF2I26_HSAytD_hfuVXktj3jHN4KaklpHIBJXmoENaSGJDA18Dgdi5IilE5x6jxVNWgcC3id5nuzatGI09YO2YFn9bEwQ0SQvpwv_fuugHPA',
    rol: "REPRESENTANTE_EMPRESA",
    company_id: "1"
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(async () => {
    mockTeamService = {
      addMemberToTeam: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useValue: {
            getTranslation: (lang: string) => {
              return of({ 'asignar_candidatos_confirmacion': '¿Desea asignar los candidatos a un equipo?',
              'asignar_candidatos_correctamente': 'Los candidatos se han asignado correctamente',
              'campos_incompletos': 'El formulario tiene campos obligatorios vacios' });
            }
          }
        }
      })],
      declarations: [ AddCandidateTeamComponent ],
      providers: [SessionService, { provide: TeamsService, useValue: mockTeamService },]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCandidateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('asignar_candidatos_confirmacion');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea asignar los candidatos a un equipo?');
  });


  it('should call addMemberToTeam method of TeamsService when confirming modal', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('asignar_candidatos_correctamente');

    component.teamId?.setValue(1);
    component.users?.setValue([{id: 1, fullName: 'Pepito Perez'}]);
    component.projectId?.setValue(1);

    (mockTeamService.addMemberToTeam as jest.Mock).mockReturnValue(of(true));

    component.confirmDialog(true);

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('Los candidatos se han asignado correctamente');
  });


  it('should display error modal when ProjectsService throws error', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('campos_incompletos');
    const errorResponse = { error: { message: 'El formulario tiene campos obligatorios vacios' } };

    (mockTeamService.addMemberToTeam as jest.Mock).mockReturnValueOnce(throwError(() => errorResponse));

    component.confirmDialog(true);

    expect(component.dataModal.textModal).toBe('El formulario tiene campos obligatorios vacios');
    expect(component.dataModal.typeModal).toBe('Error');
  });

  it('should handle confirmDialog with event false', () => {
    expect(component.confirmDialog(false)).toBeUndefined();
  });

  it('should handle closeModal with event true', () => {
    expect(component.closeModal(true)).toBeUndefined();
  });
});
