import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IPage, HelperService, IErrorResponse } from 'src/app/core';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { TasksService, ITask, ISearchableTask, ITaskResponse } from '../../../shared/tasks';




@Component({
  selector: 'app-taskes',
  templateUrl: './taskes.component.html',
  styleUrls: ['./taskes.component.scss']
})
export class TaskesComponent {

  //vars
  listOfTasks:ITask[] =[];
  StatusChanged:string ='';
  SearchValue :string = '';
  //pagination
  pagination: IPage = {
    pageSize: 10,
    pageNumber: 1,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  }

  params: ISearchableTask = {
    title: "",
    status: '',
    pageSize: this.pagination.pageSize,
    pageNumber: this.pagination.pageNumber,
  };

  //table
  displayedColumns: string[] = ['Title', 'Status', 'User', 'Project', 'CreationDate', 'Action'];


  constructor(
    private _TasksService: TasksService,
    private _helperSerivce: HelperService,
    private _Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    //define params
    this.params.title = this.SearchValue;
    this.params.status = this.StatusChanged
    this._TasksService.getAllTasks(this.params).subscribe({
      next: (res: ITaskResponse) => {
        //console.log(res)
        this.listOfTasks = res.data;
        console.log(this.listOfTasks);
        
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
  //for paginaton 
  changePage(e: PageEvent) {
    this.params.pageNumber = e.pageIndex + 1;
    this.params.pageSize = e.pageSize;
    this.getAllTasks();
  }

  //for search 
  resetSearcgInput() {
    this.SearchValue = '';
    this.getAllTasks();
  }
  //delete Task 
  openDeleteDialog(deltedId: number , taskName:string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: deltedId  , name:taskName},
    });
    dialogRef.afterClosed().subscribe(result => {
      //check result 
      if (result) {
        this.deleteTaskbyID(result)
      }


    });
  }
  deleteTaskbyID(id: number) {
    this._TasksService.onDeleteTask(id).subscribe({
      next: (res) => {
        console.log(res)
        
      },
      error: (err : IErrorResponse) => {
        this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
       },
      complete: () => {
        this.getAllTasks() ;
        this._helperSerivce.openSnackBar('Item has been deleted Sucessfully :) ')
      },

    })
  }
}
