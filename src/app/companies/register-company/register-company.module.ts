import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CustomDialogModule } from 'src/app/components/custom-dialog/custom-dialog.module';
import { RegisterCompanyComponent } from './register-company.component';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { TranslationModule } from 'src/app/components/translation/translation.module';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    imports: [
        CommonModule,
		FormsModule,
		InputTextModule,
		ButtonModule,
        PasswordModule,
        ReactiveFormsModule,
        CustomDialogModule,
        DropdownModule,
        RouterModule,
        TranslationModule,
        ProgressBarModule
    ],
    declarations: [RegisterCompanyComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class RegisterCompanyModule { }
