import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { environment } from '../../../environments/environment';
import 'jest-localstorage-mock';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService],
    });

    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get countries', () => {
    service.getCountries().subscribe(data => {
    });

    const req = httpMock.expectOne(`${environment.url_api}/commons/countries`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* Datos simulados de países */ });
  });

  it('should get regions', () => {
    service.getRegions(1).subscribe(data => {
    });

    const req = httpMock.expectOne(`${environment.url_api}/commons/regions/country/1`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* Datos simulados de regiones */ });
  });

  it('should get city', () => {
    service.getCity(1).subscribe(data => {
    });

    const req = httpMock.expectOne(`${environment.url_api}/commons/cities/region/1`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* Datos simulados de ciudades */ });
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hayan solicitudes pendientes
  });
});