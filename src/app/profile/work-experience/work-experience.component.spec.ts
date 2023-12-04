import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WorkExperienceComponent } from './work-experience.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ProfileService } from '../../services/profile/profile.service';
import { CurrentUser } from '../../services/auth/current-user.interface';

describe('WorkExperienceComponent', () => {
  let component: WorkExperienceComponent;
  let fixture: ComponentFixture<WorkExperienceComponent>;
  const currentUser: CurrentUser = {
    names: "nombres",
    surnames: 'surnames',
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjN4QUhqaVFOVl9WbjctcXRTQWFVMyJ9.eyJpc3MiOiJodHRwczovL2FiYy1qb2JzLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjUyYWM2MjgxMzViNTFhMTMyNGE5Y2YxIiwiYXVkIjoiaHR0cDovL2FiYy1qb2JzLnVzZXJzLWFwaS5kZXYiLCJpYXQiOjE2OTc2Nzc4MTQsImV4cCI6MTY5Nzc2NDIxNCwiYXpwIjoicFdzWUtHRE02MGNkdERPd0FkR1p5VDlpcGlBY0hSNE4iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbInJlYWQ6bG9jYXRpb24iLCJyZWFkOnVzZXJzIiwicmVnaXN0ZXI6Y29tcGFueSJdfQ.rMSMjblwUb17nrOZNwQBzWF9cEpDs1Zntf6m6XehlfI_fcwi0Id-u0wFrXA5Ao1wL8iKRAWxcItTWRnm1kz38w4rfdXO-5-KHARgKqGXbuzcF-BXbsxxU7ZYol5wvgDrk8JJFjsO5M22J9DA4DLpGoORNQtAexa82bdLU4wTySXRW5v__hSDVDz10227CcM4UtNyKoLQ7TAL5BT3Lkc2Rozsa0AF9VRchBj2qMNJhAXF2I26_HSAytD_hfuVXktj3jHN4KaklpHIBJXmoENaSGJDA18Dgdi5IilE5x6jxVNWgcC3id5nuzatGI09YO2YFn9bEwQ0SQvpwv_fuugHPA',
    rol: "REPRESENTANTE_EMPRESA",
    company_id: "1"
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let profileService: ProfileService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WorkExperienceComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useValue: {
            getTranslation: (lang: string) => {
              return of({ 'actualizar_experiencia_confirmacion': '¿Desea registrar la información de experiencia laboral?',
              'actualizacion_experiencia_correctamente': 'La información de experiencia laboral se ha actualizado correctamente' });
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperienceComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('actualizar_experiencia_confirmacion');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea registrar la información de experiencia laboral?');
  });

  it('should set up the form correctly', () => {
    expect(component.updateWorkExperiencie).toBeDefined();
    expect(component.updateWorkExperiencie.get('roleName')).toBeDefined();
    expect(component.updateWorkExperiencie.get('companyName')).toBeDefined();
    expect(component.updateWorkExperiencie.get('description')).toBeDefined();
    expect(component.updateWorkExperiencie.get('dateStart')).toBeDefined();
    expect(component.updateWorkExperiencie.get('dateEnd')).toBeDefined();
  });

  it('should handle confirmModal with event false', () => {
    expect(component.confirmModal(false)).toBeUndefined();
  });

  it('should handle closeModal with event true', () => {
    expect(component.closeModal(true)).toBeUndefined();
  });
  it('should call addExperience method when confirming modal', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.roleName?.setValue("Maestro");
    component.companyName?.setValue("Empresa 1");
    component.description?.setValue("Descripcion empresa");
    component.dateStart?.setValue("2021-01-01");
    component.dateEnd?.setValue("2021-01-10");
    jest.spyOn(profileService, 'addExperience').mockReturnValue(of(true));
    component.confirmModal(true);
    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('La información de experiencia laboral se ha actualizado correctamente');
  });
});
