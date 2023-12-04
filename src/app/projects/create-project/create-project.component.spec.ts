import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectComponent } from './create-project.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProjectsService} from "../../services/projects/projects.service";
import {of, throwError} from "rxjs";
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import { CurrentUser } from '../../../app/services/auth/current-user.interface';
import { SessionService } from '../../../app/services/auth/session.service';

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;
  let mockProjectsService: Partial<ProjectsService>;
  let translate: TranslateService;

  const currentUser: CurrentUser = {
    names: "nombres",
    surnames: 'surnames',
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjN4QUhqaVFOVl9WbjctcXRTQWFVMyJ9.eyJpc3MiOiJodHRwczovL2FiYy1qb2JzLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjUyYWM2MjgxMzViNTFhMTMyNGE5Y2YxIiwiYXVkIjoiaHR0cDovL2FiYy1qb2JzLnVzZXJzLWFwaS5kZXYiLCJpYXQiOjE2OTc2Nzc4MTQsImV4cCI6MTY5Nzc2NDIxNCwiYXpwIjoicFdzWUtHRE02MGNkdERPd0FkR1p5VDlpcGlBY0hSNE4iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbInJlYWQ6bG9jYXRpb24iLCJyZWFkOnVzZXJzIiwicmVnaXN0ZXI6Y29tcGFueSJdfQ.rMSMjblwUb17nrOZNwQBzWF9cEpDs1Zntf6m6XehlfI_fcwi0Id-u0wFrXA5Ao1wL8iKRAWxcItTWRnm1kz38w4rfdXO-5-KHARgKqGXbuzcF-BXbsxxU7ZYol5wvgDrk8JJFjsO5M22J9DA4DLpGoORNQtAexa82bdLU4wTySXRW5v__hSDVDz10227CcM4UtNyKoLQ7TAL5BT3Lkc2Rozsa0AF9VRchBj2qMNJhAXF2I26_HSAytD_hfuVXktj3jHN4KaklpHIBJXmoENaSGJDA18Dgdi5IilE5x6jxVNWgcC3id5nuzatGI09YO2YFn9bEwQ0SQvpwv_fuugHPA',
    rol: "REPRESENTANTE_EMPRESA",
    company_id: "1"
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    mockProjectsService = {
      registerProject: jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [CreateProjectComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useValue: {
            getTranslation: (lang: string) => {
              return of({ 'confirmacion_registrar_proyecto': '¿Desea registrar un nuevo proyecto?', 
              'proyecto_registrado_correctamente':'El proyecto se ha registrado correctamente',
              "campos_incompletos": "El formulario tiene campos obligatorios vacios" });
            }
          }
        }
      })],
      providers: [
        { provide: ProjectsService, useValue: mockProjectsService },
        TranslateService,
        SessionService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with default values', () => {
    expect(component.projectName?.value).toBe('');
    expect(component.projectDescription?.value).toBe('');
    expect(component.projectDate?.value).toBe('');
  });

  it('form should be invalid on creation', () => {
    expect(component.registerProject.valid).toBeFalsy();
  });

  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('confirmacion_registrar_proyecto');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea registrar un nuevo proyecto?');
  });

  it('form should be valid when filled out correctly', () => {
    component.projectName?.setValue('Project Test');
    component.projectDescription?.setValue('Description for project test');
    component.projectDate?.setValue(new Date());

    expect(component.registerProject.valid).toBeTruthy();
  });

  it('should call registerProject method of ProjectsService when confirming modal', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('proyecto_registrado_correctamente');

    component.projectName?.setValue('Project Test');
    component.projectDescription?.setValue('Description for project test');
    component.projectDate?.setValue(new Date());

    (mockProjectsService.registerProject as jest.Mock).mockReturnValue(of(true));

    component.confirmModal(true);

    expect(mockProjectsService.registerProject).toHaveBeenCalled();
    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('El proyecto se ha registrado correctamente');
  });

  it('should display error modal when ProjectsService throws error', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('campos_incompletos');
    const errorResponse = { error: { message: 'El formulario tiene campos obligatorios vacios' } };

    (mockProjectsService.registerProject as jest.Mock).mockReturnValueOnce(throwError(() => errorResponse));

    component.confirmModal(true);

    expect(component.dataModal.textModal).toBe('El formulario tiene campos obligatorios vacios');
    expect(component.dataModal.typeModal).toBe('Error');
  });

  it('should handle confirmModal with event false', () => {
    expect(component.confirmModal(false)).toBeUndefined();
  });

  it('should handle closeModal with event true', () => {
    expect(component.closeModal(true)).toBeUndefined();
  });

});
