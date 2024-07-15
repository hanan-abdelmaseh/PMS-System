import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskesRoutingModule } from './taskes-routing.module';
import { TaskesComponent } from './taskes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayTaskComponent } from './components/display-task/display-task.component';


@NgModule({
  declarations: [
    TaskesComponent,
    DisplayTaskComponent
  ],
  imports: [
    CommonModule,
    TaskesRoutingModule,
    SharedModule
  ]
})
export class TaskesModule { }
