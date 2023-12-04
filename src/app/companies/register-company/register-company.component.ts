import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from '../../../app/services/location/location.service';
import { CityModel, CountriesModel, RegionModel } from '../../../app/models/companies';
import { CustomDialogModel } from '../../../app/models/custom-dialog.model';
import { CompaniesService } from '../../../app/services/companies/companies.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

  registerCompany: FormGroup;
  countriesOptions: CountriesModel[];
  regionOptions: RegionModel[];
  cityOptions: CityModel[];
  dataModal: CustomDialogModel = {
    displayModal: false
  }
  loading = false;

  constructor(
    private companyService: CompaniesService,
    private router: Router,
    private locationService: LocationService,
    private translate: TranslateService) { 
    this.registerCompany = new FormGroup({
      companyName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      uniqueIdentification: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      businessActivity: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      companyEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
      representativeName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      representativeEmail: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
      representativePassword: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$._ %^&*-]).{8,}$")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      country: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.locationService.getCountries().subscribe(result => {
      this.countriesOptions = result;
    });
    
  }
  onSubmit() {
    const textModal = this.translate.instant("registrar_empresa_confirmacion");
    const typeModal = this.translate.instant("confirmacion");
    this.dataModal = {
      displayModal: true,
      textModal: textModal,
      iconModal: 'pi-exclamation-triangle',
      typeModal: typeModal
    }
  }

  confirmModal(event: boolean) {
    if (event) {
      if (this.registerCompany.valid) {
        this.loading = true;
        this.companyService.registerCompany(this.registerCompany.value).subscribe({
          next: (result) => {
            if (result) {
              this.loading = false;
              const textModal = this.translate.instant("registrar_empresa_exitoso");
              const typeModal = this.translate.instant("exito");
              this.dataModal = {
                displayModal: true,
                textModal: textModal,
                iconModal: 'pi-check',
                typeModal: typeModal
              }
            }
          },
          error: (e) => {
            console.log(e)
            this.loading = false;
            if (e.status === 400) {
              this.dataModal = {
                displayModal: true,
                textModal: e.error.message,
                iconModal: 'pi-exclamation-circle',
                typeModal: 'Error'
              }
            } else {
              const textModal = this.translate.instant("registrar_empresa_fallido");
              this.dataModal = {
                displayModal: true,
                textModal: textModal,
                iconModal: 'pi-exclamation-circle',
                typeModal: 'Error'
              }
            }
          }
        });
      } else {
        this.loading = false;
        const textModal = this.translate.instant("campos_incompletos");
        this.dataModal = {
            displayModal: true,
            textModal: textModal,
            iconModal: 'pi-exclamation-circle',
            typeModal: 'Error'
        }
      }
    }
  }

  closeModal(event: boolean) {
    this.loading = false;
    if (event) {
      this.clearForm();
    }
  }

  onChangeCountry(country: number) {
    this.locationService.getRegions(country).subscribe(result => {
      this.regionOptions = result;
    })
  }

  onChangeRegion(region: number) {
    this.locationService.getCity(region).subscribe(result => {
      this.cityOptions = result;
    })
  }

  clearForm() {
    this.registerCompany.reset();
  }

  get companyName() { return this.registerCompany.get('companyName'); }
  get uniqueIdentification() { return this.registerCompany.get('uniqueIdentification'); }
  get businessActivity() { return this.registerCompany.get('businessActivity'); }
  get companyEmail() { return this.registerCompany.get('companyEmail'); }
  get representativeName() { return this.registerCompany.get('representativeName'); }
  get representativeEmail() { return this.registerCompany.get('representativeEmail'); }
  get representativePassword() { return this.registerCompany.get('representativePassword'); }
  get phoneNumber() { return this.registerCompany.get('phoneNumber'); }
  get country() { return this.registerCompany.get('country'); }
  get region() { return this.registerCompany.get('region'); }
  get city() { return this.registerCompany.get('city'); }
  get address() { return this.registerCompany.get('address'); }

}
