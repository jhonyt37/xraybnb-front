import { Component, Input, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-candidate-card-detail',
  templateUrl: './candidate-card-detail.component.html',
  styleUrls: ['./candidate-card-detail.component.scss']
})
export class CandidateCardDetailComponent implements OnInit {

  @Input() set candidateSelected(candidateSelected) {
    this.candidate = candidateSelected;
  }
  candidate;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    console.log(this.candidate);
    
  }

}
