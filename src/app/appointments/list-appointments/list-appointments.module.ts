import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAppointmentsComponent } from './list-appointments.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslationModule } from 'src/app/components/translation/translation.module';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [ListAppointmentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    TranslationModule,
    RouterModule,
    TagModule,
    TableModule
  ]
})
export class ListAppointmentsModule { }
