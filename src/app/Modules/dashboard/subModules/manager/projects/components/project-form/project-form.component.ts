import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from 'src/app/Modules/dashboard/shared/projects/models';
import { ProjectService } from 'src/app/Modules/dashboard/shared/projects/services/project.service';
import { HelperService } from 'src/app/core';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {

  view: string = 'false';
  id!: number;

  ProjectForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  project!: IProject;


  constructor(
    private _ProjectService: ProjectService,
    private _router : Router,
    private _route: ActivatedRoute,
    private _helperService: HelperService
  ) { }

  ngOnInit(): void {
    this._route.queryParams
      .subscribe((params: any) => {
        this.id = params.id;
        this.view = params.view || true;
      })

    if (this.id) this.getProject();
  }

  onSubmit() {
    const data = this.ProjectForm.value;

    if (this.ProjectForm.valid) {
      if(this.id) this.onEdit(data);
      else this.onAdd(data);
    }
  }

  onAdd(data: IProject): void {
    this._ProjectService.onAddProject(data).subscribe({
      next: (res) => {
        this._helperService.openSnackBar("Added Successfully")
      },
      error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
      }, complete: ()=>{
        this._router.navigateByUrl('/dashboard/manager/projects')
      }
    })
  }

  onEdit(data: IProject): void {
    this._ProjectService.onEditProject(this.id, data).subscribe({
      next: (res) => {
        this._helperService.openSnackBar("Updated Successfully")
      },
      error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
      }, complete: ()=>{
        this._router.navigateByUrl('/dashboard/manager/projects')
      }
    })
  }

  getProject() {
    this._ProjectService.getById(this.id).subscribe({
      next: (res) => {
        this.project = res;
      },
      error: (err) => {
        this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
      },
      complete: () => {
        this.ProjectForm.patchValue({
          title: this.project.title,
          description: this.project.description
        })
      }
    })
  }

}
