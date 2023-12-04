import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

import { LoginComponent } from './login.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useValue: {
            getTranslation: (lang: string) => {
              return of({ 'error_inicio_sesion': 'Hubo un error al iniciar sesión' });
            }
          }
        }
      })],
      declarations: [LoginComponent],
      providers: [AuthService, TranslateService]
    });

    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user successfully', fakeAsync(() => {
    const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(of({ user: 'usuarioEjemplo' }));

    component.email.setValue('ejemplo@correo.com');
    component.password.setValue('contraseñaSegura');
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith('ejemplo@correo.com', 'contraseñaSegura');
  }));

  it('should return error on login', fakeAsync(() => {
    const translateService = TestBed.inject(TranslateService);
    translateService.use('es');
    component.dataModal.textModal = translateService.instant('error_inicio_sesion');

    const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(throwError(() => 'Error en la autenticación'));

    component.email.setValue('ejemplo@correo.com');
    component.password.setValue('contraseñaIncorrecta');
    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith('ejemplo@correo.com', 'contraseñaIncorrecta');
    tick(); 
    expect(component.dataModal.displayModal).toBe(true);
    expect(component.dataModal.textModal).toBe('Hubo un error al iniciar sesión');
  }));

});
