import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let companiesService: CompaniesService;
  let httpTestingController: HttpTestingController;
  const currentUser = { access_token: 'your-access-token' };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompaniesService],
    });

    companiesService = TestBed.inject(CompaniesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(companiesService).toBeTruthy();
  });

  it('should call login service', () => {
    const registerCompanyValue = {
      "companyName": "Mi Empresa",
      "uniqueIdentification": "123456789",
      "businessActivity": "Servicios de Tecnología",
      "companyEmail": "contacto@miempresa.com",
      "representativeName": "Juan Pérez",
      "representativeEmail": "juan@miempresa.com",
      "representativePassword": "contraseña123",
      "phoneNumber": "+1234567890",
      "country": "1",   
      "region": "2",  
      "city": "3",     
      "address": "123 Calle Principal, Suite 4A"
    };
  
    companiesService.registerCompany(registerCompanyValue).subscribe((data) => {
      expect(data).toBeDefined();
    });
  
  });
});
