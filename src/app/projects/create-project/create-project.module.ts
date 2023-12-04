import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {RouterLink} from "@angular/router";
import {CustomDialogModule} from "../../components/custom-dialog/custom-dialog.module";
import {TranslationModule} from "../../components/translation/translation.module";
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    RouterLink,
    CustomDialogModule,
    TranslationModule,
    ProgressBarModule
  ],
    declarations: [
        CreateProjectComponent
    ],
    exports: [
        CreateProjectComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CreateProjectModule { }
