import { Component, OnInit } from '@angular/core';
import { HelperService, IErrorResponse } from 'src/app/core';
import { TasksService, ITask, iTaskStatus } from '../../../shared/tasks';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  listOfTasks: ITask[] = [];
  dragedTask: any;

  constructor(
    private _TasksService: TasksService, 
    private _helperService: HelperService
  ) { }

  //drag and drop
  ngOnInit(): void {
    this.getAlltasksForUser();
  }

  //get all users 
  getAlltasksForUser() {
    this._TasksService.getAllTaskForUser({pageSize: 10000, pageNumber: 1}).subscribe({
      next: (res) => {
        this.listOfTasks = res.data;
      },
      error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
      }
    })
  }
  //filter task depend on status
  filterTasks(status: string) {
    return this.listOfTasks.filter(task => task.status == status)
  }

  //drag 
  onDrag(task: any) {
    this.dragedTask = task;
  }

  // drop 
  onDrop(event: any, statusOfTask: string) {

    const dropedTask = this.listOfTasks.find(item => item.id === this.dragedTask.id);
    if (dropedTask != undefined) {
      //update Status
      dropedTask.status = statusOfTask;

      //define params  for updating status 
      let params: iTaskStatus = {
        status: statusOfTask
      }
      this.updateTaskStatus(dropedTask.id, params)
    }
  }
  //update status
  updateTaskStatus(id: number, data: iTaskStatus) {
    this._TasksService.updateTaskStatus(id, data).subscribe({
      next: (res) => {
        this._helperService.openSnackBar("Task status has been updated ")
      },
      error: (err: IErrorResponse)=>{
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
      }
    });
  }
}
