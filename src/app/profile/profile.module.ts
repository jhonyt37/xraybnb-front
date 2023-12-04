import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TranslationModule } from '../components/translation/translation.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UpdateEducationComponent } from './update-education/update-education.component';
import { CustomDialogModule } from '../components/custom-dialog/custom-dialog.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { DividerModule } from 'primeng/divider';
import { RouterLink, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [UpdateProfileComponent, UpdateEducationComponent, WorkExperienceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationModule,
    ButtonModule,
    ProgressBarModule,
    MultiSelectModule,
    CustomDialogModule,
    CalendarModule,
    InputTextModule,
    FileUploadModule,
    RouterLink,
    TableModule,
    DividerModule,
    DropdownModule,
  ], exports: [UpdateProfileComponent, UpdateEducationComponent, WorkExperienceComponent]
})
export class ProfileModule { }
