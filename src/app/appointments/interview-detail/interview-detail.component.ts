import { Component } from '@angular/core';
import {DetailInterviewService} from "../../services/detail-interview/detail-interview.service";
import {ActivatedRoute} from "@angular/router";
import {DetailInterviewModel} from "../../models/detail-interview";
import { SessionService } from '../../../app/services/auth/session.service';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.scss']
})
export class InterviewDetailComponent {

  detailInterview: DetailInterviewModel;
  showError = false;
  user: any;

  constructor(private detailInterviewService: DetailInterviewService,
              private route: ActivatedRoute,
              private sessionService: SessionService) {
    this.user = this.sessionService.getUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idInterview = params['id'];
      this.detailInterviewService.getDetailInterview(idInterview, this.user.id).subscribe(
        {
          next: (response: any) => {
            this.detailInterview = response;
            this.showError = false;
          },
          error: (error) => {
            this.showError = true;
          }
        }
      );
    });
  }
}
