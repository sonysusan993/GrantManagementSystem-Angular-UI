import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ApplicantHomeComponent } from './applicant-home/applicant-home.component';
import { GrantprogramComponent } from './grantprogram/grantprogram.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReviewComponent } from './review/review.component';
import { RoleGuardService } from './guards/role-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'adminhome', component: AdminHomeComponent,canActivate: [RoleGuardService], data: {role: 'Admin'}},
  {path : 'register', component : RegisterComponent,canDeactivate: [CanDeactivateGuard]},
  {path : 'grantprogram' , component : GrantprogramComponent,canActivate: [RoleGuardService], data: {role: 'Admin'},canDeactivate: [CanDeactivateGuard]},
  {path : 'review', component : ReviewComponent,canActivate: [RoleGuardService], data: {role: 'Admin'},canDeactivate: [CanDeactivateGuard]},
  {path : 'applicanthome', component : ApplicantHomeComponent,canActivate: [RoleGuardService], data: {role: 'Applicant'},canDeactivate: [CanDeactivateGuard]},
  {path :'', redirectTo :'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
