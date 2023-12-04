import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomDialogModel } from 'src/app/models/custom-dialog.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent implements OnInit {
  @Input() set dataModal(data: CustomDialogModel) {
    this.data = data;
  }
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() confirmModal = new EventEmitter<boolean>();
  ref: DynamicDialogRef;
  data: CustomDialogModel;
  constructor(private translate: TranslateService) { }
  ngOnInit(): void {

  }

  closeDialog() {
    this.data.displayModal = false;
    if (this.data.typeModal === 'Éxito') {
      this.closeModal.emit(true);
    }
  }

  confirmDialog() {
    this.confirmModal.emit(true);
    this.data.displayModal = false;
  }
}