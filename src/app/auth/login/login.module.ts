import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LoginRoutingModule } from './login-routing.module';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectLanguageModule } from 'src/app/components/select-language/select-language.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDialogModule } from 'src/app/components/custom-dialog/custom-dialog.module';
import { TranslationModule } from 'src/app/components/translation/translation.module';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    imports: [
        CommonModule,
		FormsModule,
		InputTextModule,
		ButtonModule,
        PasswordModule,
        CheckboxModule,
        LoginRoutingModule,
        SelectLanguageModule,
        ReactiveFormsModule,
        CustomDialogModule,
        TranslationModule,
        ProgressBarModule
    ],
    declarations: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class LoginModule { }
