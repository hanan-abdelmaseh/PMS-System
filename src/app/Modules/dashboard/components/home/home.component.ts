import { Component } from '@angular/core';
import { TokenService } from 'src/app/core';
import { TasksService, ITaskCount } from '../../shared/tasks';
import Chart from 'chart.js/auto';
import { UserService } from '../../subModules/manager/users/services/user.service';
import { iUserData } from '../../subModules/manager/users/models/IUserData.model';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  chart: any;
  tasksCount?: ITaskCount;
  userData?: iUserData
  userName:string = '';
  isEmployeeRole! :boolean;
  isManagerRole!:boolean;
  constructor(private _TokenService:TokenService, private _TasksService:TasksService,
    private _UserService:UserService){}

  ngOnInit(): void {
    this.userName = this._TokenService.getName();
    this.getTasksCount()
    this.getUserCount();
    this.isEmployee();
    this.isManager();
  }

  getUserCount(){
    this._UserService.getUsersCount().subscribe({
      next:(res)=>{
        this.userData = res
        console.log(this.userData);
      }
    })
  }

  getTasksCount(){
    this._TasksService.getTaskCount().subscribe({
      next: (res)=>{
        this.tasksCount = res
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{

        this.chart = new Chart("myChart", {
          type: 'pie',
          data : {
            labels: [
              'To Do',
              'In Progress',
              'Done'
            ],
            datasets: [{
              label: 'Tasks',
              data: [this.tasksCount?.toDo, this.tasksCount?.inProgress, this.tasksCount?.done],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          }
        });

      }
    })
  }


 
   isEmployee(){
    this.isEmployeeRole = this._TokenService.isEmployee();
   }
   isManager(){
    this.isManagerRole = this._TokenService.isManager();
   }
  
}
