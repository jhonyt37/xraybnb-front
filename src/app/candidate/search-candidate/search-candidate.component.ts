import { Component, OnInit } from '@angular/core';
import { AbilityModel, EducationTypeModel, ExperienceModel, LanguageModel } from '../../../app/models/commons';
import { CountriesModel } from '../../../app/models/companies';
import { CommonsService } from '../../../app/services/commons/commons.service';
import { LocationService } from '../../../app/services/location/location.service';
import {CandidateService} from "../../services/candidates/candidate.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.scss']
})
export class SearchCandidateComponent implements OnInit {

  countriesOptions: CountriesModel[];
  abilityOptions: AbilityModel[];
  languageOptions: LanguageModel[];
  experienceOptions: ExperienceModel[];
  educationTypeOptions: EducationTypeModel[];
  selectedAbility: any[] = [];
  selectedLanguage: any[] = [];
  selectedCountry: any[] = [];
  selectedExperience: any[] = [];
  selectedEducation: any[] = [];
  data: any;
  candidateSelected;
  candidateSelectedId;

  constructor(
    private locationService: LocationService,
    private commonsService: CommonsService,
    private candidateService: CandidateService,
    private translate: TranslateService
  ) {

  }
  
  ngOnInit(): void {
    this.locationService.getCountries().subscribe(result => {
      this.countriesOptions = result;
    });

    this.commonsService.getAbilities().subscribe(result => {
      this.abilityOptions = result;
    });

    this.commonsService.getLanguages().subscribe(result => {
      this.languageOptions = result;
    });

    this.experienceOptions = [
      {id: "0-1", name: "0 a 1 año"},
      {id: "1-3", name: "1 a 3 años"},
      {id: "3-5", name: "3 a 5 años"},
      {id: "5", name: "+ 5 años"}
    ]

    this.commonsService.getEducationType().subscribe(result => {
      this.educationTypeOptions = result;
    });

    this.candidateService.getCandidates().subscribe(result => {
      this.candidateSelectedId = result[0].id;
      this.candidateSelected = result[0];
      this.data = result;
    });
  }

  createParams() {
    let params: any = {};
    if (this.selectedAbility.length > 0) {
      params.skills = this.selectedAbility.toString();
    }

    if (this.selectedLanguage.length > 0) {
      params.languages = this.selectedLanguage.toString();
    }

    if (this.selectedCountry.length > 0) {
      params.countries = this.selectedCountry.toString();
    }

    if (this.selectedEducation.length > 0) {
      params.education = this.selectedEducation.toString();
    }

    if (this.selectedExperience.length > 0) {
      params.experienceYears = this.selectedExperience.toString();
    }

    return params;
  }

  onChangeFilter() {
    const params = this.createParams();
    this.candidateService.getCandidates(params).subscribe(result => {
      this.data = result;
      this.candidateSelected = result[0];
      this.candidateSelectedId = result[0].id;
    });
  }

  selectedCandidate(candidate) {
    this.candidateSelectedId = candidate.id;
    this.candidateSelected = candidate;
  }

}
