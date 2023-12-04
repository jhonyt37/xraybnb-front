import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CustomDialogModule } from '../../components/custom-dialog/custom-dialog.module';
import { DropdownModule } from 'primeng/dropdown';
import { TranslationModule } from '../../components/translation/translation.module';
import { RegisterTechnicalTestComponent } from './register-technical-test.component';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';



@NgModule({
  declarations: [RegisterTechnicalTestComponent],
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CustomDialogModule,
    DropdownModule,
    TranslationModule,
    RouterModule,
    CommonModule,
    ProgressBarModule
  ],
  exports: [RegisterTechnicalTestComponent],
})
export class RegisterTechnicalTestModule { }
