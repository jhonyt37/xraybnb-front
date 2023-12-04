import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UpdateProfileComponent } from './update-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CommonsService } from '../../services/commons/commons.service';
import { ProfileService } from '../../services/profile/profile.service';
import { CurrentUser } from '../../services/auth/current-user.interface';

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  const currentUser: CurrentUser = {
    names: "nombres",
    surnames: 'surnames',
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjN4QUhqaVFOVl9WbjctcXRTQWFVMyJ9.eyJpc3MiOiJodHRwczovL2FiYy1qb2JzLWRldi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjUyYWM2MjgxMzViNTFhMTMyNGE5Y2YxIiwiYXVkIjoiaHR0cDovL2FiYy1qb2JzLnVzZXJzLWFwaS5kZXYiLCJpYXQiOjE2OTc2Nzc4MTQsImV4cCI6MTY5Nzc2NDIxNCwiYXpwIjoicFdzWUtHRE02MGNkdERPd0FkR1p5VDlpcGlBY0hSNE4iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbInJlYWQ6bG9jYXRpb24iLCJyZWFkOnVzZXJzIiwicmVnaXN0ZXI6Y29tcGFueSJdfQ.rMSMjblwUb17nrOZNwQBzWF9cEpDs1Zntf6m6XehlfI_fcwi0Id-u0wFrXA5Ao1wL8iKRAWxcItTWRnm1kz38w4rfdXO-5-KHARgKqGXbuzcF-BXbsxxU7ZYol5wvgDrk8JJFjsO5M22J9DA4DLpGoORNQtAexa82bdLU4wTySXRW5v__hSDVDz10227CcM4UtNyKoLQ7TAL5BT3Lkc2Rozsa0AF9VRchBj2qMNJhAXF2I26_HSAytD_hfuVXktj3jHN4KaklpHIBJXmoENaSGJDA18Dgdi5IilE5x6jxVNWgcC3id5nuzatGI09YO2YFn9bEwQ0SQvpwv_fuugHPA',
    rol: "REPRESENTANTE_EMPRESA",
    company_id: "1"
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let commonsService: CommonsService;
  let profileService: ProfileService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useValue: {
            getTranslation: (lang: string) => {
              return of({
                'actualizar_habilidades_confirmacion': '¿Desea registrar actualizar habilidades e idiomas?',
                'actualizacion_habilidades_correctamente': 'Se actualizaron las habilidades e idiomas correctamente'
              });
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    commonsService = TestBed.inject(CommonsService);
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('actualizar_habilidades_confirmacion');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea registrar actualizar habilidades e idiomas?');
  });
  it('should handle confirmModal with event false', () => {
    expect(component.confirmModal(false)).toBeUndefined();
  });

  it('should handle closeModal with event true', () => {
    expect(component.closeModal(true)).toBeUndefined();
  });
  it('should get list of abilities', () => {
    const mockHabilidades: any = [
      { idAbility: 1, "name": "Habilidad 1", },
    ];
    jest.spyOn(commonsService, 'getAbilities').mockReturnValue(of(mockHabilidades));
    component.getAbilities();
    expect(component.abilityOptions.length).toBeGreaterThan(0);
  });
  it('should get list of languages', () => {
    const mockLanguage: any = [
      { name: 'Ingles', id: 2, code: 'en' },
    ];
    jest.spyOn(commonsService, 'getLanguages').mockReturnValue(of(mockLanguage));
    component.getLanguages();
    expect(component.languageOptions.length).toBeGreaterThan(0);
  });
  it('should get candidate detail', () => {
    const mockCandidateDetail: any = [
      { name: 'Candidato 1', id: 1, },
    ];
    jest.spyOn(profileService, 'getCandidate').mockReturnValue(of(mockCandidateDetail));
    component.updateCandidate();
    expect(component.candidate.id).toEqual(mockCandidateDetail.id);
    expect(component.candidate.name).toEqual(mockCandidateDetail.name);
  });
  it('should call UpdateLanguageSkills method when confirming modal', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.languges?.setValue(["ES,EN"]);
    component.skils?.setValue([1, 2]);
    component.experienceYears?.setValue(1);
    jest.spyOn(profileService, 'UpdateLanguageSkills').mockReturnValue(of(true));
    component.confirmModal(true);
    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('Se actualizaron las habilidades e idiomas correctamente');
  });

});
