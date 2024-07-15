
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/core';
import { IMenu } from './model/IMenu.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  opened: boolean = false;
  @ViewChild("parElm", { static: true }) parElm!: ElementRef;
  @ViewChild("sect", { static: true }) sect!: ElementRef;
  @Input() height!:string;
  
  menu: IMenu[] = [
    {
      text: 'Home',
      icon: 'fa-thin fa-house',
      link: '/dashboard/home',
      isActive: true
    },
    {
      text: 'Users',
      icon: 'fa-thin fa-user-group',
      link: '/dashboard/manager/users',
      isActive: this._TokenService.isManager()
    },
    {
      text: 'Projects',
      icon: 'fa-thin fa-objects-column',
      link: '/dashboard/manager/projects',
      isActive: this._TokenService.isManager()
    },
    {
      text: 'Tasks',
      icon: 'fa-thin fa-list-check',
      link: '/dashboard/manager/tasks',
      isActive: this._TokenService.isManager()
    },
    {
      text: 'Projects',
      icon: 'fa-thin fa-objects-column',
      link: '/dashboard/employee/projects',
      isActive: this._TokenService.isEmployee()
    },
    {
      text: 'Tasks',
      icon: 'fa-thin fa-list-check',
      link: '/dashboard/employee/task-board',
      isActive: this._TokenService.isEmployee()
    },
  ]

  constructor(private _TokenService:TokenService){}

  toggleSidebar() {
    this.parElm.nativeElement.classList.toggle("active-sidebar")
    this.opened = !this.opened;
  }

}
