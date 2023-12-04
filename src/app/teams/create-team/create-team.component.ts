import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomDialogModel } from '../../models/custom-dialog.model';
import { ProjectModel } from '../../models/projects';
import { SessionService } from '../../services/auth/session.service';
import { ProjectsService } from '../../services/projects/projects.service';
import { TeamsService } from '../../services/teams/teams.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  team: FormGroup;
  dataModal: CustomDialogModel = {
    displayModal: false
  }
  user: any;
  loading = false;
  projectOptions: ProjectModel[];
  statusOptions: any[];

  constructor(
    private translate: TranslateService,
    private projectService: ProjectsService,
    private sessionService: SessionService,
    private teamService: TeamsService
  ) {
    this.user = this.sessionService.getUser();

    this.team = new FormGroup({
      projectId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.projectService.getProjectsByCompany(this.user.company_id).subscribe(result => {
      this.projectOptions = result;
    });

    this.statusOptions = [
      {
        name: "Activo"
      },
      {
        name: "Inactivo"
      }
    ]
  }

  onSubmit() {
    const textModal = this.translate.instant("crear_equipo_confirmacion");
    const typeModal = this.translate.instant("confirmacion");
    this.dataModal = {
      displayModal: true,
      textModal: textModal,
      iconModal: 'pi-exclamation-triangle',
      typeModal: typeModal
    }
  }

  confirmDialog(event: boolean) {
    if (event) {
      if (this.team.valid) {
        this.loading = true;
        console.log(this.team.value);
        
        this.teamService.createTeam(this.team.value).subscribe( {
          next: (result) => {
            if (result) {
              this.loading = false;
              this.dataModal = {
                displayModal: true,
                textModal: this.translate.instant("crear_equipo_correctamente"),
                iconModal: 'pi-check',
                typeModal: this.translate.instant("exito")
              }
            }
          },
          error: (e) => {
            this.loading = false;
            this.dataModal = {
              displayModal: true,
              textModal: this.translate.instant("error_crear_equipo"),
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

  clearForm() {
    this.team.reset();
  }

  closeModal(event: boolean) {
    this.loading = false;
    if (event) {
      this.clearForm();
    }
  }

  get projectId() { return this.team.get('projectId'); }
  get name() { return this.team.get('name'); }
  get status() { return this.team.get('status'); }

}
