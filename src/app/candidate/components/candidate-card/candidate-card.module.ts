import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCardComponent } from './candidate-card.component';
import {TranslationModule} from "../../../components/translation/translation.module";

@NgModule({
    imports: [
        CommonModule,
        TranslationModule
    ],
    declarations: [CandidateCardComponent],
    exports: [CandidateCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CandidateCardModule { }
