import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject, ISearchableProject, IProjectResponse } from '../models';
import { Observable } from 'rxjs';

interface iParams extends ISearchableProject, HttpParams{}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _httpClient: HttpClient) { }

  getAllProjects(params: ISearchableProject): Observable<IProjectResponse>{
    return this._httpClient.get<IProjectResponse>('Project', {params: (params as iParams)});
  }

  getById(id: number): Observable<IProject>{
    return this._httpClient.get<IProject>(`Project/${id}`);
  }

  getProjectsByManager(params: ISearchableProject): Observable<IProjectResponse>{
    return this._httpClient.get<IProjectResponse>(`Project/manager`, {params: (params as iParams)});
  }

  getProjectsByEmployee(params: ISearchableProject): Observable<IProjectResponse>{
    return this._httpClient.get<IProjectResponse>(`Project/employee`, {params: (params as iParams)});
  }

  onAddProject(data: IProject): Observable<IProject>{
    return this._httpClient.post<IProject>('Project', data);
  }

  onEditProject(id:number, data: IProject): Observable<IProject>{
    return this._httpClient.put<IProject>(`Project/${id}`, data);
  }

  onDeleteProject(id:number){
    return this._httpClient.delete(`Project/${id}`);
  }
}
