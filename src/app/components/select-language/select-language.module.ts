import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { SelectLanguageComponent } from './select-language.component';
import { TranslationModule } from '../translation/translation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        TranslationModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [SelectLanguageComponent],
    exports: [SelectLanguageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SelectLanguageModule { }
