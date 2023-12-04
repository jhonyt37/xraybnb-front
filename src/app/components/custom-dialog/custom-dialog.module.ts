import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CustomDialogComponent } from "./custom-dialog.component";
import { ButtonModule } from 'primeng/button';
import {TranslationModule} from "../translation/translation.module";

@NgModule({
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        TranslationModule,
    ],
    declarations: [CustomDialogComponent],
    exports: [CustomDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CustomDialogModule { }
