import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchCandidateComponent } from '../candidate/search-candidate/search-candidate.component';
import { RegisterCompanyComponent } from '../companies/register-company/register-company.component';
import { CreateProjectComponent } from '../projects/create-project/create-project.component';
import { AddCandidateTeamComponent } from '../teams/add-candidate-team/add-candidate-team.component';
import { HomeComponent } from './home.component';
import { RegisterTechnicalTestComponent } from '../test/register-technical-test/register-technical-test.component';
import { InterviewDetailComponent } from "../appointments/interview-detail/interview-detail.component";
import { ListAppointmentsComponent } from '../appointments/list-appointments/list-appointments.component';
import { PerformanceEvaluationComponent } from '../test/performance-evaluation/performance-evaluation.component';
import { CreateTeamComponent } from '../teams/create-team/create-team.component';
import { UpdateProfileComponent } from '../profile/update-profile/update-profile.component';
import { UpdateEducationComponent } from '../profile/update-education/update-education.component';
import { WorkExperienceComponent } from '../profile/work-experience/work-experience.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: '', component: HomeComponent,
			children: [
				{ path: 'crear-proyecto', component: CreateProjectComponent },
				{ path: 'registrar-empresa', component: RegisterCompanyComponent },
				{ path: 'registar-resultados-prueba-tecnica', component: RegisterTechnicalTestComponent },
				{ path: 'buscar-candidato', component: SearchCandidateComponent },
				{ path: 'asignar-candidato-equipo', component: AddCandidateTeamComponent },
				{ path: 'detalle-entrevista/:id', component: InterviewDetailComponent },
				{ path: 'listar-citas', component: ListAppointmentsComponent },
				{ path: 'evaluar-desempeño', component: PerformanceEvaluationComponent },
				{ path: 'crear-equipo', component: CreateTeamComponent },
				{ path: 'completar-perfil', component: UpdateProfileComponent },
				{ path: 'actualizar-educacion', component: UpdateEducationComponent },
				{ path: 'actualizar-experiencia-laboral', component: WorkExperienceComponent },
			]
		},
	])],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
