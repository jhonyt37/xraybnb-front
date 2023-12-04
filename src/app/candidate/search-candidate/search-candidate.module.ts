import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectLanguageModule } from 'src/app/components/select-language/select-language.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDialogModule } from 'src/app/components/custom-dialog/custom-dialog.module';
import { SearchCandidateComponent } from './search-candidate.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CandidateCardModule } from '../components/candidate-card/candidate-card.module';
import { CandidateCardDetailModule } from '../components/candidate-card-detail/candidate-card-detail.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
		FormsModule,
		InputTextModule,
		ButtonModule,
        PasswordModule,
        CheckboxModule,
        SelectLanguageModule,
        ReactiveFormsModule,
        CustomDialogModule,
        MultiSelectModule,
        CandidateCardModule,
        CandidateCardDetailModule,
      TranslateModule
    ],
    declarations: [SearchCandidateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SearchCandidateModule { }
