import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { HelperService, IErrorResponse, IPage } from 'src/app/core';
import Table from 'src/app/shared/table/model/table.model';
import { IProjectResponse, ISearchableProject } from '../../../shared/projects/models';
import { ProjectService } from '../../../shared/projects/services/project.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {


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
        headerName: "Num Tasks",
        valueGetter: (row: any) => {
          return row.task.length;
        }
      },
      {
        field: "creationDate",
        headerName: "Created At",
        valueFormatter: (value: string): string => {
          let pipe = new DatePipe("en")
          return pipe.transform(value, 'fullDate') as string;
        },
      },
      {
        field: "modificationDate",
        headerName: "Modified At",
        valueFormatter: (value: string): string => {
          let pipe = new DatePipe("en")
          return pipe.transform(value, 'fullDate') as string;
        }
      },
    ],
    data: [],
    operators: []
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
    this._projectService.getProjectsByEmployee(this.params).subscribe({
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

  resetSearchInput() {
    this.params.title = '';
    this.getProjects();
  }

  changePage(e: PageEvent) {
    this.params.pageNumber = e.pageIndex + 1;
    this.params.pageSize = e.pageSize;
    this.getProjects();
  }

}
