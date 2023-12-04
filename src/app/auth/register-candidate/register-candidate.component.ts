import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CityModel, CountriesModel, RegionModel } from '../../../app/models/companies';
import { CustomDialogModel } from '../../../app/models/custom-dialog.model';
import { AuthService } from '../../../app/services/auth/auth.service';
import { CommonsService } from '../../../app/services/commons/commons.service';
import { LocationService } from '../../../app/services/location/location.service';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}

@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.scss']
})
export class RegisterCandidateComponent implements OnInit {

  maxDate: Date | undefined;
  register: FormGroup;
  dataModal: CustomDialogModel = {
    displayModal: false
  }
  loading = false;
  idTypesOptions: any[];
  countriesOptions: CountriesModel[];
  regionOptions: RegionModel[];
  cityOptions: CityModel[];
  isLoadedRegion = false;
  isLoadedCity = false;

  constructor(
    private fb: FormBuilder,
    private commonsService: CommonsService,
    private locationService: LocationService,
    private translate: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.register = this.fb.group({
      names: new FormControl('', [Validators.required, Validators.pattern("^[a-zñA-ZÑ ]*$"), Validators.maxLength(100)]),
      surnames: new FormControl('', [Validators.required, Validators.pattern("^[a-zñA-ZÑ ]*$"), Validators.maxLength(100)]),
      typeIdentificationId: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$"), Validators.maxLength(100)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(50)]),
      dateBirthday: new FormControl('', [Validators.required]),
      countryId: new FormControl('', [Validators.required]),
      regionId: new FormControl({value:'', disabled: true}, [Validators.required]),
      cityId: new FormControl({value:'', disabled: true}, [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$._ %^&*-]).{8,}$")]),
      repeatPassword: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$._ %^&*-]).{8,}$")])
    },
    {
      validator: this.ConfirmPasswordValidator("password", "repeatPassword")
    }
    );

    this.commonsService.getIdType().subscribe(result => {
      this.idTypesOptions = result;
    });

    this.locationService.getCountries().subscribe(result => {
      this.countriesOptions = result;
    });

  }

  onSubmit() {
    const textModal = this.translate.instant("registrar_candidato_confirmacion");
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
      if (this.register.valid) {
        this.loading = true;
        this.authService.registerCandidate(this.register.value).subscribe({
          next: (result) => {
            if (result) {
              this.loading = false;
              const textModal = this.translate.instant("registrar_candidato_exitoso");
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
              const textModal = this.translate.instant("registrar_candidato_fallido");
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
      this.regionId.enable();
    })
  }

  onChangeRegion(region: number) {
    this.locationService.getCity(region).subscribe(result => {
      this.cityOptions = result;
      this.cityId.enable();
    })
  }

  clearForm() {
    this.register.reset();
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get names() { return this.register.get('names'); }
  get surnames() { return this.register.get('surnames'); }
  get typeIdentificationId() { return this.register.get('typeIdentificationId'); }
  get identification() { return this.register.get('identification'); }
  get phone() { return this.register.get('phone'); }
  get dateBirthday() { return this.register.get('dateBirthday'); }
  get countryId() { return this.register.get('countryId'); }
  get regionId() { return this.register.get('regionId'); }
  get cityId() { return this.register.get('cityId'); }
  get address() { return this.register.get('address'); }
  get email() { return this.register.get('email'); }
  get password() { return this.register.get('password'); }
  get repeatPassword() { return this.register.get('repeatPassword'); }

}
