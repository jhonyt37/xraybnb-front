import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EducationTypeModel } from '../../models/commons';
import { CustomDialogModel } from '../../models/custom-dialog.model';
import { CommonsService } from '../../services/commons/commons.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.scss'],
})
export class UpdateEducationComponent implements OnInit {
  updateEducation!: FormGroup;
  dataModal: CustomDialogModel = {
    displayModal: false
  }
  currentUser: any;
  loading: boolean = false;
  uploadedFiles: any[] = [];
  multiple: boolean | undefined;
  educationTypeOptions: EducationTypeModel[];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private commonsService: CommonsService,
    private profileService: ProfileService,
  ) {
    this.multiple = true;
    this.updateEducation = new FormGroup({
      tittleName: new FormControl('', [Validators.required]),
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl('', [Validators.required]),
      educationType: new FormControl('', [Validators.required]),
      institution: new FormControl('', [Validators.required]),
    }, this.validatedate);
  }
  validatedate(group: FormGroup) {
    if (group.get('dateEnd')?.value == "" || group.get('dateEnd')?.value == null) {
      return null;
    }
    const invalid = group.get('dateStart').value > group.get('dateEnd').value;
    group.get('dateEnd')?.setErrors(invalid ? { 'invaliddate': true } : null);
    return invalid ? { 'invaliddate': true } : null;
  }

  ngOnInit() {
    this.getEducationType()
  }
  getEducationType() {
    this.commonsService.getEducationType().subscribe(result => {
      this.educationTypeOptions = result;
    });
  }
  onSubmit() {
    const textModal = this.translate.instant("actualizar_educacion_confirmacion");
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
      if (this.updateEducation.valid) {
        this.loading = true;
        let education = {
          title: this.updateEducation.get("tittleName")?.value,
          dateInit: this.updateEducation.get("dateStart")?.value,
          dateEnd: this.updateEducation.get("dateEnd")?.value,
          type: this.updateEducation.get("educationType")?.value,
          institution: this.updateEducation.get("institution")?.value,
        }
        const local = localStorage.getItem('currentUser');
        if (local !== null) {
          this.currentUser = JSON.parse(local);
        }
        this.profileService.addEducation(this.currentUser.id, education).subscribe({
          next: (result: any) => {
            if (result) {
              this.loading = false;
              this.dataModal = {
                displayModal: true,
                textModal: this.translate.instant("actualizacion_educacion_correctamente"),
                iconModal: 'pi-check',
                typeModal: this.translate.instant("exito")
              }
            }
          },
          error: (e: any) => {
            this.loading = false;
            this.dataModal = {
              displayModal: true,
              textModal: this.translate.instant("error_actualizando_informacion"),
              iconModal: 'pi-times',
              typeModal: this.translate.instant("error")
            }
          }
        });
      }
    }
  }
  closeModal(event: boolean) {
    this.loading = false;
    if (event) {
      this.router.navigate(['/completar-perfil']);
    }
  }

  get tittleName() { return this.updateEducation.get('tittleName'); }
  get dateStart() { return this.updateEducation.get('dateStart'); }
  get dateEnd() { return this.updateEducation.get('dateEnd'); }
  get educationType() { return this.updateEducation.get('educationType'); }
  get institution() { return this.updateEducation.get('institution'); }
}
