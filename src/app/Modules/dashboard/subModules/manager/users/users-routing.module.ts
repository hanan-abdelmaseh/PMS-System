import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';

const routes: Routes = [{ path: '', component: UsersComponent },
{ path: 'view/:id/:mood', component: DisplayUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
