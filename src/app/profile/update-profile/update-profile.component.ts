import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomDialogModel } from '../../models/custom-dialog.model';
import { CommonsService } from '../../services/commons/commons.service';
import { ProfileService } from '../../services/profile/profile.service';
import { AbilityModel, LanguageModel } from '../../models/commons';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {

  candidate: any;
  abilityOptions!: AbilityModel[];
  languageOptions!: LanguageModel[];
  profileSkills!: FormGroup;
  dataModal: CustomDialogModel = {
    displayModal: false
  }
  loading = false;
  currentUser: any;
  constructor(
    private translate: TranslateService,
    private profileService: ProfileService,
    private commonsService: CommonsService,
  ) {

    this.profileSkills = new FormGroup({
      languges: new FormControl(''),
      skils: new FormControl(''),
      experienceYears: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  updateCandidate() {
    const local = localStorage.getItem('currentUser');
    if (local !== null) {
      this.currentUser = JSON.parse(local);
    }
    this.loading = true;
    this.profileService.getCandidate(this.currentUser.id).subscribe(result => {
      this.candidate = result;
      this.loading = false;
      this.profileSkills.get("experienceYears")?.setValue(this.candidate.experienceYears);
      this.getLanguges();
      this.getSkils();
    })
  }
  getLanguges() {
    let lenguges: any = [];
    if (this.candidate && this.candidate.languages) {
      this.candidate.languages.forEach((element: any) => {
        lenguges.push(element.code);
      });
    }
    this.profileSkills.get("languges")?.setValue(lenguges);
  }

  getSkils() {
    let skils: any = [];
    if (this.candidate && this.candidate.skills) {
      this.candidate?.skills.forEach((element: any) => {
        skils.push(element.idAbility);
      })
    }
    this.profileSkills.get("skils")?.setValue(skils);
  }

  onSubmit() {
    const textModal = this.translate.instant("actualizar_habilidades_confirmacion");
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
      if (this.profileSkills.valid) {
        this.loading = true;
        let skilsAndLanguges = {
          languages: this.profileSkills.get("languges")?.value,
          abilities: this.profileSkills.get("skils")?.value,
          experienceYears: this.profileSkills.get("experienceYears")?.value
        }
        const local = localStorage.getItem('currentUser');
        if (local !== null) {
          this.currentUser = JSON.parse(local);
        }
        this.profileService.UpdateLanguageSkills(this.currentUser.id, skilsAndLanguges).subscribe({
          next: (result: any) => {
            if (result) {
              this.loading = false;
              this.dataModal = {
                displayModal: true,
                textModal: this.translate.instant("actualizacion_habilidades_correctamente"),
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
      this.updateCandidate()
    }
  }
  ngOnInit() {
    this.getAbilities();
    this.getLanguages();
  }
  getAbilities() {
    this.commonsService.getAbilities().subscribe(result => {
      this.abilityOptions = result;
      this.updateCandidate();
    });
  }
  getLanguages() {
    this.commonsService.getLanguages().subscribe(result => {
      this.languageOptions = result;
    });
  }

  get languges() { return this.profileSkills.get('languges'); }
  get skils() { return this.profileSkills.get('skils'); }
  get experienceYears() { return this.profileSkills.get('experienceYears'); }
}
