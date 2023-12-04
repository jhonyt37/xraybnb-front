import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CustomDialogModule} from "../../components/custom-dialog/custom-dialog.module";
import {TranslationModule} from "../../components/translation/translation.module";
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CreateTeamComponent } from './create-team.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CustomDialogModule,
    TranslationModule,
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    ProgressBarModule,
    InputTextModule
  ],
  declarations: [
      CreateTeamComponent
  ],
  exports: [
      CreateTeamComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CreateTeamModule { }
