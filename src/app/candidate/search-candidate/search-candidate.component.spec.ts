import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { LocationService } from '../../../app/services/location/location.service';
import { CommonsService } from '../../../app/services/commons/commons.service';
import { CandidateService } from '../../../app/services/candidates/candidate.service';
import { SearchCandidateComponent } from './search-candidate.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MultiSelectModule} from "primeng/multiselect";


describe('SearchCandidateComponent', () => {
  let component: SearchCandidateComponent;
  let fixture: ComponentFixture<SearchCandidateComponent>;
  let locationService: any; 
  let commonsService: any; 
  let candidateService: any;
  let translate: TranslateService;

  beforeEach(waitForAsync(() => {
    
    commonsService = {
      getAbilities: jest.fn().mockReturnValue(of(['Ability 1', 'Ability 2'])),
      getLanguages: jest.fn().mockReturnValue(of(['Language 1', 'Language 2'])),
      getEducationType: jest.fn().mockReturnValue(of(['Education 1', 'Education 2'])),
    };
    candidateService = {
      getCandidates: jest.fn().mockReturnValue(of([
        { id: '1', name: 'Candidate 1' },
        { id: '2', name: 'Candidate 2' },
      ])),
    };

    locationService = {
      getCountries: jest.fn().mockReturnValue(of([{ id: '1', name: 'Country 1' }]))
    };

    TestBed.configureTestingModule({
      imports: [
        MultiSelectModule,
        TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
      })],
      declarations: [SearchCandidateComponent],
      providers: [
        { provide: LocationService, useValue: locationService },
        { provide: CommonsService, useValue: commonsService },
        { provide: CandidateService, useValue: candidateService },
      ]
    }).compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCandidateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch countries and set countriesOptions', () => {
    component.ngOnInit();

    expect(component.countriesOptions).toEqual([{ id: '1', name: 'Country 1' }]);
  });

  it('should fetch abilities and set abilityOptions', () => {
    component.ngOnInit();

    expect(component.abilityOptions).toEqual(['Ability 1', 'Ability 2']);
  });

  it('should fetch languages and set languageOptions', () => {
    component.ngOnInit();

    expect(component.languageOptions).toEqual(['Language 1', 'Language 2']);
  });

  it('should create parameters for filtering', () => {
    component.selectedAbility = ['Ability 1', 'Ability 2'];
    component.selectedLanguage = ['Language 1', 'Language 2'];
    component.selectedCountry = ['Country 1', 'Country 2'];
    component.selectedEducation = ['Education 1', 'Education 2'];
    component.selectedExperience = ['0-1', '1-3'];

    const params = component.createParams();

    expect(params.skills).toEqual('Ability 1,Ability 2');
    expect(params.languages).toEqual('Language 1,Language 2');
    expect(params.countries).toEqual('Country 1,Country 2');
    expect(params.education).toEqual('Education 1,Education 2');
    expect(params.experienceYears).toEqual('0-1,1-3');
  });

  it('should change filter and fetch candidates', () => {
    component.onChangeFilter();

    expect(component.data).toEqual([
      { id: '1', name: 'Candidate 1' },
      { id: '2', name: 'Candidate 2' },
    ]);
    expect(component.candidateSelected).toEqual({ id: '1', name: 'Candidate 1' });
    expect(component.candidateSelectedId).toEqual('1');
  });

  it('should select a candidate', () => {
    const candidate = { id: '2', name: 'Candidate 2' };
    component.selectedCandidate(candidate);

    expect(component.candidateSelected).toEqual(candidate);
    expect(component.candidateSelectedId).toEqual('2');
  });

  it('should translate search-title', () => {
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', { 'busqueda': 'Búsqueda' });
    translate.use('es');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#search-title').textContent).toContain('Búsqueda');
  });
});