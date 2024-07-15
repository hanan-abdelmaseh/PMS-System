import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { BlockedUserComponent } from './components/blocked-user/blocked-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    DisplayUserComponent,
    BlockedUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
