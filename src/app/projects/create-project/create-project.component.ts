import { Component } from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormControl} from "@angular/forms";
import {CustomDialogModel} from "../../models/custom-dialog.model";
import {ProjectsService} from "../../services/projects/projects.service";
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../../app/services/auth/session.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  minDate: Date | undefined;
  registerProject: FormGroup;
  dataModal: CustomDialogModel = {
    displayModal: false
  }
  user: any;
  loading = false;

  constructor(
    private projectService: ProjectsService,
    private translate: TranslateService,
    private sessionService: SessionService
  ) {
    this.minDate = new Date();
    this.registerProject = new FormGroup({
      projectName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      projectDescription: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      projectDate: new FormControl('', [Validators.required]),
    });

    this.user = this.sessionService.getUser();
  }

  onSubmit() {
    const textModal = this.translate.instant("confirmacion_registrar_proyecto");
    this.dataModal = {
      displayModal: true,
      textModal: textModal,
      iconModal: 'pi-exclamation-triangle',
      typeModal: this.translate.instant("confirmacion")
    }
  }

  get projectName() { return this.registerProject.get('projectName'); }
  get projectDescription() { return this.registerProject.get('projectDescription'); }
  get projectDate() { return this.registerProject.get('projectDate'); }

  clearForm() {
    this.registerProject.reset();
  }

  closeModal(event: boolean) {
    this.loading = false;
    if (event) {
      this.clearForm();
    }
  }

  confirmModal(event: boolean) {
    if (event) {
      if (this.registerProject.valid) {
        this.loading = true;
        console.log(this.user.company_id);
        
        this.projectService.registerProject({...this.registerProject.value, companyId: parseInt(this.user.company_id)}).subscribe( {
          next: (result) => {
            if (result) {
              this.loading = false;
              this.dataModal = {
                displayModal: true,
                textModal: this.translate.instant("proyecto_registrado_correctamente"),
                iconModal: 'pi-check',
                typeModal: this.translate.instant("exito")
              }
            }
          },
          error: (e) => {
            this.loading = false;
            this.dataModal = {
              displayModal: true,
              textModal: e.error.message,
              iconModal: 'pi-times',
              typeModal: this.translate.instant("error")
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
}
