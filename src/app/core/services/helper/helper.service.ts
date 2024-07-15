import { Injectable } from '@angular/core';
import { IErrorResponse } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _snackBar: MatSnackBar) { }

  isAttrExist<T>(attr: T): T | null{
    return attr? attr : null;
  }

  getErrorMessage(err: IErrorResponse): string{
    const errors = err.error.additionalInfo.errors;
    if(errors){
      let message = "";
      for( let error in errors){
        for(let index in errors[error]){
          message += errors[error][index] + " ";
        }
      }
      return message;
    }
    return err.error.message;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close");
    setTimeout(()=>{
      this._snackBar.dismiss()
    }, 3000)
  }

  groupBy(xs: any[], key: string | number) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

}
