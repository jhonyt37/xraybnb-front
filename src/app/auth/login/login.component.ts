import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomDialogModel } from '../../models/custom-dialog.model';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import {SessionService} from "../../services/auth/session.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    login: FormGroup;
    valCheck: string[] = ['remember'];
    dataModal: CustomDialogModel = {
        displayModal: false
    }
    loading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private translate: TranslateService,
        private sessionService: SessionService
    ){}

    ngOnInit() {
        this.login = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
            password: new FormControl('', [Validators.required, Validators.minLength(1)])
        });
    }

    onSubmit() {
        if (this.login.valid) {
            this.loading = true;
            const textModal = this.translate.instant("error_inicio_sesion");
            console.log('paso 0');
            this.authService.login(this.email.value, this.password.value).subscribe(
                

                res => console.log('HTTP response', res),
                err => console.log('HTTP Error', err),
                () => console.log('HTTP request completed.')
                /*next: (result) => {
                    if (result) {
                        this.loading = false;
                        localStorage.setItem('currentUser', JSON.stringify(result));
                        this.sessionService.loadSession();
                        this.router.navigate(['/']);
                    }
                },
                error: (e) => {
                    this.loading = false;
                    this.dataModal = {
                        displayModal: true,
                        textModal: textModal + " "+ e,
                        iconModal: 'pi-exclamation-circle',
                        typeModal: 'Error' 
                    }
                }
                */
            
            );
        } else {
            this.loading = false;
            const textModal = this.translate.instant("campos_incompletos");
            this.dataModal = {
                displayModal: true,
                textModal: textModal,
                iconModal: 'pi-exclamation-circle',
                typeModal: 'Error'
            }
        }
    }

    get email() { return this.login.get('email'); }
    get password() { return this.login.get('password'); }
}
