import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface LanguageOptions {
  name: string,
  code: string
  imageSrc: string
}

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})

export class SelectLanguageComponent implements OnInit {

  languages: LanguageOptions[];
  selectedLanguage: any;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.languages = [
      { name: 'Español - CO', code: 'es_col', imageSrc: "../../../assets/images/country.png" },
      { name: 'Español - AR', code: 'es_ar', imageSrc: "../../../assets/images/country_arg.png" },
      { name: 'English - US', code: 'en_us', imageSrc: "../../../assets/images/country_us.png" },
    ];
  }

  onLanguageChange(event: any) {
    this.translate.use(event.code);
  }

}
