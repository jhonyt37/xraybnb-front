import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {CandidateModel} from '../../../app/models/candidate.model';
import {CustomDialogModel} from '../../../app/models/custom-dialog.model';
import {DimensionModel} from '../../../app/models/performance-evaluations';
import {ProjectModel} from '../../../app/models/projects';
import {TeamsModel} from '../../../app/models/teams';
import {SessionService} from '../../../app/services/auth/session.service';
import {ProjectsService} from '../../../app/services/projects/projects.service';
import {TeamsService} from '../../../app/services/teams/teams.service';
import {PerformanceEvaluationService} from '../../../app/services/test/performance-evaluation.service';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-performance-evaluation',
    templateUrl: './performance-evaluation.component.html',
    styleUrls: ['./performance-evaluation.component.scss']
})
export class PerformanceEvaluationComponent implements OnInit {

    performanceEval: FormGroup;
    dataModal: CustomDialogModel = {
        displayModal: false
    }
    user: any;
    loading = false;
    projectOptions: ProjectModel[];
    teamsOptions: TeamsModel[];
    candidateOptions: CandidateModel[];
    dimensionOptions: DimensionModel[];
    performanceOptions: any[];

    constructor(
        private sessionService: SessionService,
        private projectService: ProjectsService,
        private teamService: TeamsService,
        private translate: TranslateService,
        private performanceEvalService: PerformanceEvaluationService
    ) {
        this.user = this.sessionService.getUser();

        this.performanceEval = new FormGroup({
            projectId: new FormControl('', [Validators.required]),
            teamId: new FormControl('', [Validators.required]),
            candidateId: new FormControl('', [Validators.required]),
            dimensionId: new FormControl('', [Validators.required]),
            performance: new FormControl('', [Validators.required]),
            observations: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {

        this.projectService.getProjectsByCompany(this.user.company_id).subscribe(result => {
            this.projectOptions = result;
        });

        this.performanceEvalService.getDimensions().subscribe(result => {
            this.dimensionOptions = result;
        });

        this.performanceOptions = [
            {
                name: "Alto"
            },
            {
                name: "Medio"
            },
            {
                name: "Bajo"
            }
        ]

    }

    onSubmit() {
        const textModal = this.translate.instant("evaluacion_desempenio_confirmacion");
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
            if (this.performanceEval.valid) {
                this.loading = true;
                const performanceEvaluation = {
                    performance: this.performance.value,
                    observations: this.observations.value,
                    project_id: this.projectId.value,
                    team_id: this.teamId.value,
                    user_id: this.candidateId.value,
                    qualifying_user_id: this.user.id,
                    dimension_id: this.dimensionId.value,
                    hash: this.calculateHash()
                }
                this.performanceEvalService.registerPerformanceEval(performanceEvaluation).subscribe({
                    next: (result) => {
                        if (result) {
                            this.loading = false;
                            this.dataModal = {
                                displayModal: true,
                                textModal: this.translate.instant("evaluacion_desempenio_correctamente"),
                                iconModal: 'pi-check',
                                typeModal: this.translate.instant("exito")
                            }
                        }
                    },
                    error: (e) => {
                        this.loading = false;
                        this.dataModal = {
                            displayModal: true,
                            textModal: this.translate.instant("error_evaluacion_desempenio"),
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

    private calculateHash(): string {
        const concatenatedData = `${this.performance.value}${this.observations.value}${this.projectId.value}${this.teamId.value}${this.candidateId.value}${this.user.id}${this.dimensionId.value}`;
        return CryptoJS.SHA256(concatenatedData).toString();
    }

    clearForm() {
        this.performanceEval.reset();
    }

    closeModal(event: boolean) {
        this.loading = false;
        if (event) {
            this.clearForm();
        }
    }

    onChangeProject(projectId: number) {
        this.teamService.getTeamsByproject(projectId).subscribe(result => {
            this.teamsOptions = result;
        });
    }

    onChangeTeam(teamId: number) {
        this.teamService.getCandidateByTeam(teamId).subscribe(result => {
            this.candidateOptions = result.map(candidate => {
                candidate.fullName = `${candidate.names} ${candidate.surnames}`;
                return candidate;
            });
        });
    }

    get projectId() {
        return this.performanceEval.get('projectId');
    }

    get teamId() {
        return this.performanceEval.get('teamId');
    }

    get candidateId() {
        return this.performanceEval.get('candidateId');
    }

    get dimensionId() {
        return this.performanceEval.get('dimensionId');
    }

    get performance() {
        return this.performanceEval.get('performance');
    }

    get observations() {
        return this.performanceEval.get('observations');
    }

}
