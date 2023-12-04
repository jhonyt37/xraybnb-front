import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MenuModule } from '../components/menu/menu.module';
import { NavBarModule } from '../components/nav-bar/nav-bar.module';
import { CreateProjectModule } from '../projects/create-project/create-project.module';
import { RegisterCompanyModule } from '../companies/register-company/register-company.module';
import { SearchCandidateModule } from '../candidate/search-candidate/search-candidate.module';
import { RegisterTechnicalTestModule } from '../test/register-technical-test/register-technical-test.module';
import { AddCandidateTeamModule } from '../teams/add-candidate-team/add-candidate-team.module';
import { InterviewDetailComponent } from "../appointments/interview-detail/interview-detail.component";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { PerformanceEvaluationModule } from '../test/performance-evaluation/performance-evaluation.module';
import { CreateTeamModule } from '../teams/create-team/create-team.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenuModule,
    NavBarModule,
    CreateProjectModule,
    RegisterCompanyModule,
    SearchCandidateModule,
    AddCandidateTeamModule,
    RegisterTechnicalTestModule,
    TranslateModule,
    ButtonModule,
    PerformanceEvaluationModule,
    CreateTeamModule,
    ProfileModule
  ],
  declarations: [
    HomeComponent,
    InterviewDetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HomeModule { }
