import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService, IErrorResponse,  } from 'src/app/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {

  hide: boolean = true;
  requestForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  bgImagePath = "url('assets/images/bg3.png')";

  constructor(private _AuthService:AuthService, private _helperService: HelperService, private _router: Router) {
   }

  ngOnInit() {
    (document.querySelector(".auth-bg") as any).style.setProperty("--imagePath", `${this.bgImagePath}`)
  }
  
  sendRequestForm(): void {
    const data = this.requestForm.value;

    if (this.requestForm.valid) {
      this._AuthService.onForget(data).subscribe({
        next: (res) => {
          this._helperService.openSnackBar(res.message);
        },
        error: (err: IErrorResponse) => {
          this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
        },
        complete: ()=>{
          this._router.navigate(["/auth/reset"], { queryParams: { email: data["email"] } });
        }
      })
    }

  }

}
