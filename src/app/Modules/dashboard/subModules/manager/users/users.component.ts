import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IPage, HelperService, IErrorResponse } from 'src/app/core';
import { IUserResponse } from './models/iUserResponse.model';
import { ISearchableUser } from './models/iSearchableUser.model';
import { UserService } from './services/user.service';
import { IUserModel } from './models';
import { BlockedUserComponent } from './components/blocked-user/blocked-user.component';
import { iUserData } from './models/IUserData.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //vars
  listOfUsers: IUserModel[] = [];
  StatusChanged: string = '';
  SearchValue: string = '';
  searchBy: "userName"| "email" | "country" | '' = ''
  groupsID: string = '';
  userItem: string ="";

  //pagination
  pagination: IPage = {
    pageSize: 10,
    pageNumber: 1,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  }

  params: ISearchableUser = {
    userName: "",
    email: "",
    country: "",
    groups: "",
    pageSize: this.pagination.pageSize,
    pageNumber: this.pagination.pageNumber,
  };

  //table
  displayedColumns: string[] = ['User Name', 'Status', 'Phone Number', 'Email', 'Country', 'CreationDate', 'Action'];

  constructor(
    private _UserService: UserService,
    private _helperSerivce: HelperService,
    private _Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.params = {
      ...this.params,
      groups: [this.groupsID],
      [this.searchBy]: this.SearchValue,
    };

    this._UserService.getAllUsers(this.params).subscribe({
      next: (res: IUserResponse) => {
        this.listOfUsers = res.data;
        this.pagination = (({ pageSize,
          pageNumber,
          totalNumberOfRecords,
          totalNumberOfPages, ...rest }) => {
          return {
            pageSize,
            pageNumber,
            totalNumberOfRecords,
            totalNumberOfPages,
          }
        })(res)
      }, error: (err: IErrorResponse) => {
        this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
      }
    })
  }
  
  openBlcockDialog( userData:IUserModel): void {
    const dialogRef = this.dialog.open(BlockedUserComponent, {
      data: userData,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
    
       this.toggleStatus(result.id);
      
      }
   })
   
  }

  toggleStatus(id: number){
    this._UserService.onToggleActivation(id).subscribe({
      next: (res: any) => {   
      }, error: (err: IErrorResponse) => {
        this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
      },
      complete: ()=>{
        this._helperSerivce.openSnackBar('Status has been changed ')
        this.getAllUsers();
      }
    });
  }
///


  //for paginaton 
  changePage(e: PageEvent) {
    this.params.pageNumber = e.pageIndex + 1;
    this.params.pageSize = e.pageSize;
    this.getAllUsers();
  }
  //for search 
  resetSearchInput() {
    this.SearchValue = '';
    this.params = {
      ...this.params,
      [this.searchBy]: ''
    }
    this.getAllUsers();
  }

  resetParams(){
    this.params = {
      ...this.params,
      userName: '',
      country: '',
      email: '',
      [this.searchBy]: this.SearchValue
    }
  }
  }

