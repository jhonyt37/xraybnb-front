import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterCandidateComponent } from './register-candidate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RegisterCandidateComponent }
	])],
	exports: [RouterModule]
})
export class RegisterCandidateRoutingModule { }
