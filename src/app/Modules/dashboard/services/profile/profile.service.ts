import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../model/iUser.model';
import { IChangePassword, } from '../../model/iChangePass.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpClient: HttpClient) { }

  getProfile():Observable<IUser>{
    return this._httpClient.get<IUser>(`Users/currentUser`);
  }

  updateProfile(data: FormData){
    return this._httpClient.put(`Users`, data);
  }

  onChangePassword(data: IChangePassword): Observable<any>{
    return this._httpClient.put("Users/ChangePassword", data);
  }
}
