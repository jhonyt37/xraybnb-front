import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';

import { CommonsService } from './commons.service';

describe('CommonsService', () => {
  let service: CommonsService;
  let httpTestingController: HttpTestingController;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommonsService],
    });

    service = TestBed.inject(CommonsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get abilities', () => {
    const abilitiesData = [{ name: 'Ability 1' }, { name: 'Ability 2' }];

    service.getAbilities().subscribe((data) => {
      expect(data).toEqual(abilitiesData);
    });

    const req = httpTestingController.expectOne(`${environment.url_api}/commons-app/skills`);
    expect(req.request.method).toBe('GET');
    req.flush(abilitiesData);
  });

  it('should get languages', () => {
    const languagesData = [{ name: 'Language 1' }, { name: 'Language 2' }];

    service.getLanguages().subscribe((data) => {
      expect(data).toEqual(languagesData);
    });

    const req = httpTestingController.expectOne(`${environment.url_api}/commons-app/languages`);
    expect(req.request.method).toBe('GET');
    req.flush(languagesData);
  });

  it('should get education types', () => {
    const educationTypesData = [{ name: 'Education 1' }, { name: 'Education 2' }];

    service.getEducationType().subscribe((data) => {
      expect(data).toEqual(educationTypesData);
    });

    const req = httpTestingController.expectOne(`${environment.url_api}/commons-app/education-types`);
    expect(req.request.method).toBe('GET');
    req.flush(educationTypesData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
