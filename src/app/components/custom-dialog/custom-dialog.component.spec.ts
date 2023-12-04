import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDialogComponent } from './custom-dialog.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('CustomDialogComponent', () => {
  let component: CustomDialogComponent;
  let fixture: ComponentFixture<CustomDialogComponent>;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
      })],
      declarations: [ CustomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDialogComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      displayModal: false,
      textModal: 'Hubo un error al iniciar sesión',
      iconModal: 'pi-exclamation-circle',
      typeModal: 'Error'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with success', () => {
    component.data = {
      displayModal: true,
      textModal: 'Success message',
      iconModal: 'success-icon',
      typeModal: 'Éxito',
    };

    let closeEventEmitted = false;
    component.closeModal.subscribe((result: boolean) => {
      closeEventEmitted = result;
    });

    component.closeDialog();

    expect(component.data.displayModal).toBe(false);
    expect(closeEventEmitted).toBe(true);
  });

  it('should confirm dialog', () => {
    let confirmEventEmitted = false;
    component.confirmModal.subscribe((result: boolean) => {
      confirmEventEmitted = result;
    });

    component.confirmDialog();

    expect(confirmEventEmitted).toBe(true);
    expect(component.data.displayModal).toBe(false);
  });
  it('should translate label btnConfirm', ()=> {
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', { 'aceptar': 'Aceptar' });
    translate.use('es');
    component.data = {
      displayModal: true,
      textModal: 'Hubo un error al iniciar sesión',
      iconModal: 'pi-exclamation-circle',
      typeModal: 'Confirmación'
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#btnConfirm').textContent).toContain('Aceptar');
  })

});
