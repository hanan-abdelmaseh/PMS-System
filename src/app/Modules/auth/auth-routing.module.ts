import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgotPassword.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: '' ,redirectTo: "login", pathMatch: "full"},
      { path: "login", component: LoginComponent },
      { path: 'verify', component: VerifyComponent },
      { path: "reset", component: ResetPasswordComponent },
      { path: 'register', component: RegisterComponent }, 
      { path: 'ForgotPassword', component:ForgotPasswordComponent}
    ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
