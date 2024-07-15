
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/Modules/dashboard/model/iUser.model';

import { TasksService, ITask, ITaskData } from 'src/app/Modules/dashboard/shared/tasks';
import { HelperService } from 'src/app/core';
import { UserService } from '../../../users/services/user.service';
import { ISearchableProject, IProject, ProjectService, IProjectResponse } from 'src/app/Modules/dashboard/shared/projects';


@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.scss']
})
export class DisplayTaskComponent {

  view!: string;
  disabledView = false;
  id!: number;
  //////
  pageSize = 1000;
  pageNumber = 1;
  //for getting all projects
  params: ISearchableProject = {
    title: "",
    pageSize: this.pageSize,
    pageNumber: this.pageNumber,
  };
  //for getting users
  userParams: any = {
    groups: 2,
    pageSize: this.pageSize,
    pageNumber: this.pageNumber,
  };///////data 

  Projectsdata: IProject[] = [];
  UsersData: IUser[] = [];
  ///for updating task
  updatingTaskData!: ITask;
  ///form 
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    employeeId: new FormControl('', [Validators.required]),
    projectId: new FormControl('', [Validators.required]),
  });

  constructor(
    private _ProjectService: ProjectService,
    private _TasksService: TasksService,
    private _UserService: UserService,
    private _route: Router,
    private _helperService: HelperService, private _ActivatedRoute: ActivatedRoute
  ) {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.view = this._ActivatedRoute.snapshot.params['mode']
    //console.log(this.view)
    if (this.id) {
      //edit 
      this.getTaskById(this.id);

    }
    // to remove save button in view mode and disable the fields 
    if (this.view) {
      this.disabledView = true
    }

  }

  ngOnInit(): void {
    this.getAllProject();
    this.getAllUsers();
    //


  }

  ///get by id 
  getTaskById(id: number) {
    this._TasksService.getTaskById(id).subscribe({
      next: (res) => {
        //console.log(res);
        this.updatingTaskData = res;
      },
      error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));

      },
      complete: () => {
        //patching values
        this.taskForm.patchValue({
          title: this.updatingTaskData.title,
          description: this.updatingTaskData.description,
          employeeId: this.updatingTaskData.employee?.id,
          projectId: this.updatingTaskData.project?.id,
        });

      }

    });
  }

  onSubmit(data: FormGroup) {
    if (this.id) {
      // -update  
      this.onEditTask(this.id, data.value);
    }
    else {
      /// add new task 
      this.onAddTask(data.value);
    }
  }

  onAddTask(data: ITaskData): void {

    this._TasksService.onAddTask(data).subscribe({
      next: (res) => {
        this._helperService.openSnackBar("Task has been added Successfully");
      }, error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));

      }, complete: () => {
        this._route.navigateByUrl('/dashboard/manager/tasks')
      }
    });

  }

  onEditTask(id: number, tasksData: ITaskData) {
    this._TasksService.onEditTask(id, tasksData).subscribe({
      next: (res) => {
        this._helperService.openSnackBar("Task has been updated Successfully");
      }, error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
      }, complete: () => {
        this._route.navigateByUrl('/dashboard/manager/tasks')
      }
    });
  }


  getAllProject() {
    this._ProjectService.getAllProjects(this.params).subscribe({
      next: (res: IProjectResponse) => {
        //console.log(res)
        this.Projectsdata = res.data;
      }
    });
  }
  //need to be edited
  getAllUsers() {
    this._UserService.getAllUsers(this.userParams).subscribe({
      next: (res: any) => {
        this.UsersData = res.data;
      }
    });
  }


}
