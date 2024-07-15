import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IForget, ILogin, IReset, IResetResponse, IVerify } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  login(data: ILogin){
    return this._httpClient.post("Users/Login", data);
  }

  register( data : FormData){
    return this._httpClient.post("Users/Register", data);
  }

  verify(data: IVerify):Observable<any>{
    return this._httpClient.put("Users/verify", data);
  }

  onForget( data: IForget): Observable<any>{
    return this._httpClient.post("Users/Reset/Request", data);
  }

  onReset(data: IReset): Observable<any>{
    return this._httpClient.post("Users/Reset", data);
  }

}
