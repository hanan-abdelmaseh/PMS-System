import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { TokenService } from '../..';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService, private _NgxSpinnerService:NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // this._NgxSpinnerService.show()

    const token = this._tokenService.getToken();
    const BaseUrl = "https://upskilling-egypt.com:3003/api/v1";
    request = request.clone({
      url: `${BaseUrl}/${request.url}`
    });

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // return next.handle(request)
    return next.handle(request).pipe(
      // finalize(()=>{
      //   this._NgxSpinnerService.hide()
      // }),
      catchError((err) => {
        // if (err.status === 401) {
        //   this._tokenService.logout();
        // }
        //const error = err.error || err.statusText;
        return throwError(() => err);
      })
    );
  }
}
