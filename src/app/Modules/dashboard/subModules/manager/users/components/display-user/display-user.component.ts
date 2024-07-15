import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HelperService } from 'src/app/core';
import { IUserModel } from '../../models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {

  userId!: number;
  userData!: IUserModel;
  staticImagPath: string = 'https://upskilling-egypt.com:3003/';
  dumyImage: string = '../../../../../../../../assets/images/profile.jpeg'
  newImagePath!: string;

  constructor(private _UserService: UserService,
    private _helperService: HelperService
    , private _ActivatedRoute: ActivatedRoute) {
    this.userId = this._ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUserById(this.userId);
  }


  getUserById(id: number) {
    this._UserService.getUserById(id).subscribe({
      next: (res) => {
        this.userData = res;
      
        if (this.userData.imagePath == null) {
          this.newImagePath =this.dumyImage;
        }
        else {
          this.newImagePath = this.staticImagPath + this.userData.imagePath
        }
       // console.log(this.newImagePath)
      },
      error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));

      },
      complete: () => {

      }

    });
  }

}
