import { Component, OnInit } from '@angular/core';
import Table from 'src/app/shared/table/model/table.model';
import { ProjectService } from '../../../shared/projects/services/project.service';
import { IProjectResponse, ISearchableProject } from '../../../shared/projects/models';
import { HelperService, IErrorResponse, IPage } from 'src/app/core';

import { PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  table: Table = {
    colDefs: [
      {
        field: "title",
        headerName: "Title",
      },
      {
        field: "description",
        headerName: "Description",
      },
      {
        headerName: "Num tasks",
        valueGetter: (row: any)=>{
          return row.task.length;
        }
      },
      {
        field: "creationDate",
        headerName: "Creation date",
        valueFormatter: (value: string): string => {
          let pipe = new DatePipe("en")
          return pipe.transform(value, 'fullDate') as string;
        },
      },
      {
        field: "modificationDate",
        headerName: "Modification date",
        valueFormatter: (value: string): string => {
          let pipe = new DatePipe("en")
          return pipe.transform(value, 'fullDate') as string;
        }
      },
     
    ],
    data: [],
    operators: [
     
      {
        title: "View",
        icon: 'visibility',
        //action: this.viewProject
      },
      {
        title: "Edit",
        icon: 'edit_square',
        //action: this.editProject
      },
      {
        title: "Delete",
        icon: 'delete',
        //action: this.viewProject
      }
    ]
  };

  pagination: IPage = {
    pageSize: 10,
    pageNumber: 1,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  }

  params: ISearchableProject = {
    title: "",
    pageSize: this.pagination.pageSize,
    pageNumber: this.pagination.pageNumber,
  };

  constructor(
    private _projectService: ProjectService, 
    private _helperSerivce: HelperService, 
    private _Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjectsByManager(this.params).subscribe({
      next: (res: IProjectResponse) => {
        //console.log(res)
        this.table.data = res.data;
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

  onOperation(data: any){
    if(data.opInfo === "View") this.viewProject(data.row);
    else if(data.opInfo === "Edit") this.editProject(data.row);
    if(data.opInfo === "Delete") this.deleteDialog(data.row);
  }

  viewProject(row: any) {
    let params = { id: row.id, view: true };
    this._Router.navigate(["/dashboard/manager/projects/view"], { queryParams: params });
  }

  editProject(row: any) {
    let params = { id: row.id, view: false };
    this._Router.navigate(["/dashboard/manager/projects/edit"], { queryParams: params });
  }

  deleteProject(id: number){
    this._projectService.onDeleteProject(id).subscribe({
      next: (res) => {
        this._helperSerivce.openSnackBar("Deleted Succesfully");
      },
      error: (err) => {
        this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
      },
      complete: () => {
        this.getProjects();
      }
    })
  }

  deleteDialog(row: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: row.id , name:row.title },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(result);
      }
    });
  }

  resetSearchInput(){
    this.params.title= '';
    this.getProjects();
  }

  changePage(e: PageEvent) {
    this.params.pageNumber = e.pageIndex + 1;
    this.params.pageSize = e.pageSize;
    this.getProjects();
  }

}
