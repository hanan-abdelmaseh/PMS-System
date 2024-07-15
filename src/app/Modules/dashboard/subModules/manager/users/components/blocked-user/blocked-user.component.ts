import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/Modules/dashboard/model/iUser.model';

import { HelperService, IErrorResponse } from 'src/app/core';
import { UserService } from '../../services/user.service';
import { IUserModel } from '../../models/iUser.model';


@Component({
  selector: 'app-blocked-user',
  templateUrl: './blocked-user.component.html',
  styleUrls: ['./blocked-user.component.scss']
})
export class BlockedUserComponent {
  // _UserService: any;
  _helperService: any;
  userItem:string ='';
  userData:IUser | any;
  constructor(
    public dialogRef: MatDialogRef<BlockedUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserModel,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
