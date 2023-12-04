import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { LocationService } from '../../../app/services/location/location.service';
import { CompaniesService } from '../../../app/services/companies/companies.service';
import { RegisterCompanyComponent } from './register-company.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import {PasswordModule} from "primeng/password";
import {DropdownModule} from "primeng/dropdown";

describe('RegisterCompanyComponent', () => {
  let component: RegisterCompanyComponent;
  let fixture: ComponentFixture<RegisterCompanyComponent>;
  let locationService: LocationService;
  let companiesService: CompaniesService;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterCompanyComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, PasswordModule, DropdownModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: {
              getTranslation: (lang: string) => {
                return of({ 'registrar_empresa_confirmacion': '¿Desea registrar una nueva empresa?', 
                "registrar_empresa_exitoso": "Empresa registrada con éxito", 
                "registro_empresa": "Registro empresa",
                "campos_incompletos": "El formulario tiene campos obligatorios vacios" });
              }
            }
          }
        })],
      providers: [LocationService, CompaniesService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCompanyComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    locationService = TestBed.inject(LocationService);
    companiesService = TestBed.inject(CompaniesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.registerCompany).toBeDefined();
  });

  it('should fetch countries on ngOnInit', () => {
    const countries = [{ name: 'Country A' }, { name: 'Country B' }];
    jest.spyOn(locationService, 'getCountries').mockReturnValue(of(countries));

    component.ngOnInit();

    expect(component.countriesOptions).toEqual(countries);
  });

  it('should handle onSubmit', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('registrar_empresa_confirmacion');

    component.onSubmit();

    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('¿Desea registrar una nueva empresa?');
  });

  it('should handle confirmModal with event true', () => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('campos_incompletos');

    jest.spyOn(companiesService, 'registerCompany').mockReturnValue(of({ success: true }));
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

  it('should translate title-form', () => {
    const translateService = TestBed.inject(TranslateService);
    translate.setTranslation('es', { 'registro_empresa': 'Registro empresa' });
    translateService.use('es');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#title-form').textContent).toContain('Registro empresa');
  });

});
