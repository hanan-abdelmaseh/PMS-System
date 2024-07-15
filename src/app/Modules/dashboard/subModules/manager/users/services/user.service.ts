import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserResponse } from '../models/iUserResponse.model';
import { ISearchableUser } from '../models/iSearchableUser.model';
import { Observable } from 'rxjs';
import { IUserModel } from '../models';


interface IParams extends ISearchableUser, HttpParams{}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  getAllUsers(params: ISearchableUser): Observable<IUserResponse>{
    return this._httpClient.get<IUserResponse>('Users/', {params: (params as IParams)});
  }

  getUserById(id: number): Observable<IUserModel>{
    return this._httpClient.get<IUserModel>(`Users/${id}`);
  }

  onToggleActivation(id:number):Observable<IUserModel>{
    return this._httpClient.put<IUserModel>(`Users/${id}`, {});
  }

  getUsersCount():Observable<any>{
    return this._httpClient.get('Users/count')
  }
}
