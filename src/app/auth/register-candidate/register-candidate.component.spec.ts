import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../app/services/auth/auth.service';
import { LocationService } from '../../../app/services/location/location.service';

import { RegisterCandidateComponent } from './register-candidate.component';

describe('RegisterCandidateComponent', () => {
  let component: RegisterCandidateComponent;
  let fixture: ComponentFixture<RegisterCandidateComponent>;
  let locationService: LocationService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: (lang: string) => {
                return of({ 'registrar_candidato_confirmacion': '¿Desea registrarse como candidato?',
                'campos_incompletos': 'El formulario tiene campos obligatorios vacios' });
              }
            }
          }
        })
      ],
      declarations: [ RegisterCandidateComponent ],
      providers: [LocationService, AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCandidateComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('registrar_candidato_confirmacion');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea registrarse como candidato?');
  });

  it('should handle confirmModal with event true', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('campos_incompletos');

    jest.spyOn(authService, 'registerCandidate').mockReturnValue(of({ success: true }));
    component.confirmModal(true);

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('El formulario tiene campos obligatorios vacios');
  });

  it('should handle confirmModal with event false', () => {
    expect(component.confirmModal(false)).toBeUndefined();
  });

  it('should handle closeModal with event true', () => {
    expect(component.closeModal(true)).toBeUndefined();
  });

  it('should handle onChangeCountry', fakeAsync(() => {
    const regions = [{ name: 'Region A' }, { name: 'Region B' }];
    jest.spyOn(locationService, 'getRegions').mockReturnValue(of(regions));

    component.onChangeCountry(1);
    tick();

    expect(component.regionOptions).toEqual(regions);
  }));

  it('should handle onChangeRegion', fakeAsync(() => {
    const cities = [{ name: 'City A' }, { name: 'City B' }];
    jest.spyOn(locationService, 'getCity').mockReturnValue(of(cities));

    component.onChangeRegion(1);
    tick();

    expect(component.cityOptions).toEqual(cities);
  }));

  it('should clear the form', () => {
    expect(component.clearForm()).toBeUndefined();
  });

});
