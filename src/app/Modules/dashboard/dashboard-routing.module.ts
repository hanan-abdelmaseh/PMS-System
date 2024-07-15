import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { managerGuard, employeeGuard } from 'src/app/core';
import { HomeComponent } from './components/home/home.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "changePassword", component: ChangePasswordComponent },
      { path: "profile", component: ProfileComponent },
      { path: 'manager', canActivate: [managerGuard], loadChildren: () => import('./subModules/manager/manager.module').then(m => m.ManagerModule) },
      { path: 'employee', canActivate: [employeeGuard], loadChildren: () => import('./subModules/employee/employee.module').then(m => m.EmployeeModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
