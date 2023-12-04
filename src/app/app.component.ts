import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private translate: TranslateService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.translate.setDefaultLang('es_col');
    }
}
