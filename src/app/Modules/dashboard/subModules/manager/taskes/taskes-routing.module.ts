import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskesComponent } from './taskes.component';
import { DisplayTaskComponent } from './components/display-task/display-task.component';

const routes: Routes = [{ path: '', component: TaskesComponent },
{ path: 'add', component: DisplayTaskComponent},
{ path: 'edit/:id', component: DisplayTaskComponent},
{ path: 'view/:id/:mode', component: DisplayTaskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskesRoutingModule { }
