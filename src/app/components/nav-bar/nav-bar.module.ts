import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { RouterModule } from '@angular/router';
import { SelectLanguageModule } from '../select-language/select-language.module';
import {AvatarModule} from "primeng/avatar";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelectLanguageModule,
    AvatarModule
  ],
    declarations: [NavBarComponent],
    exports: [NavBarComponent]
})
export class NavBarModule { }
