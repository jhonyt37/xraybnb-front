import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidateModel } from 'src/app/models/candidate.model';
import { CustomDialogModel } from '../../models/custom-dialog.model';
import { ResultTechnicalTestModel, StateTechnicalTestModel, TechnicalTestModel } from 'src/app/models/technical-test.model';
import { CandidateService } from '../../services/candidates/candidate.service';
import { TranslateService } from '@ngx-translate/core';
import { TechnicalTestService } from '../../services/test/technical-test.service';

@Component({
  selector: 'app-register-technical-test',
  templateUrl: './register-technical-test.component.html',
  styleUrls: ['./register-technical-test.component.scss']
})
export class RegisterTechnicalTestComponent {
  registerTechnicalTest: FormGroup;
  technicalTestOptions: TechnicalTestModel[];
  candidateOptions: CandidateModel[];
  stateOptions: StateTechnicalTestModel[];
  dataModal: CustomDialogModel = {
    displayModal: false
  }
  loading = false;

  constructor(private candidateService: CandidateService,
    private technicalTestService: TechnicalTestService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getTechnicalTest();
    this.stateOptions = [
      {
        state: "Aprobada",
        value: "aprobada",
      },
      {
        state: "Reprobada",
        value: "fallida",
      },
    ]
    this.registerTechnicalTest = new FormGroup({
      technicalTest: new FormControl('', [Validators.required]),
      candidate: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern(/^[0-9]*(\.[0-9]+)?$/),]),
      observations: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    })
  }

  onSubmit() {
    const textModal = this.translate.instant("confirma_registar_resultados_prueba_tecnica");
    this.dataModal = {
      displayModal: true,
      textModal: textModal,
      iconModal: 'pi-exclamation-triangle',
      typeModal: this.translate.instant("confirmacion")
    }
  }

  confirmModal(event: boolean) {
    if (event) {
      const local = localStorage.getItem('currentUser');
      let currentUser: any;
      if (local !== null) {
        currentUser = JSON.parse(local);
      }
      let form: ResultTechnicalTestModel = {
        observations: this.registerTechnicalTest.get("observations")?.value,
        qualify: this.registerTechnicalTest.get("qualification")?.value,
        qualifying_user_id: this.registerTechnicalTest.get("candidate")?.value,
        state: this.registerTechnicalTest.get("state")?.value,
        test_id: this.registerTechnicalTest.get("technicalTest")?.value,
        user_id: currentUser.id
      }
      this.loading = true;
      this.technicalTestService.registerResultTechnicalTest(form).subscribe({
        next: (result) => {
          if (result) {
            this.loading = false;
            const textModal = this.translate.instant("resultado_prueba_tecnica_almacenado_con_exito");
            this.dataModal = {
              displayModal: true,
              textModal: textModal,
              iconModal: 'pi-check',
              typeModal: 'Éxito'
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
            this.loading = false;
            const textModal = this.translate.instant("error_almacenando_resultado_prueba_tecnica");
            this.dataModal = {
              displayModal: true,
              textModal: textModal,
              iconModal: 'pi-exclamation-circle',
              typeModal: 'Error'
            }
          }
        }
      });
    }
  }

  onChangeTest(value) {
    this.getCandidate(value)
    this.registerTechnicalTest.get('candidate').setValue(null)
  }

  getCandidate(idTest: number) {
    this.candidateService.getTestCandidates(idTest).subscribe(result => {
      this.candidateOptions = [];
      for (let index = 0; index < result.length; index++) {
        let candidate = result[index].users;
        this.candidateOptions.push(
          {
            names: candidate.names,
            id: candidate.id,
            totalName: candidate.names + " " + candidate.surnames,
            surnames: candidate.surnames
          })
      }
    });
  }

  closeModal(event: boolean) {
    this.loading = false;
    if (event) {
      this.clearForm();
    }
  }

  clearForm() {
    this.registerTechnicalTest.reset();
  }

  getTechnicalTest() {
    this.technicalTestService.getTechnicalTest().subscribe(result => {
      this.technicalTestOptions = result;
    });
  }

  get technicalTest() { return this.registerTechnicalTest.get('technicalTest'); }
  get candidate() { return this.registerTechnicalTest.get('candidate'); }
  get state() { return this.registerTechnicalTest.get('state'); }
  get qualification() { return this.registerTechnicalTest.get('qualification'); }
  get observations() { return this.registerTechnicalTest.get('observations'); }
}
