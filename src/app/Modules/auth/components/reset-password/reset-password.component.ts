import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IResetResponse,IReset } from '../../models/iReset.model';
import { HelperService, IErrorResponse,  } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent {
  statusCode: number | null = null;

  hide: boolean = true;
  hideConfirm: boolean = true;

  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/
      ),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/
      ),
    ]),
    seed: new FormControl('', [Validators.required]),
  });

  bgImagePath = "url('assets/images/bg1-1.png')";

  constructor(
    private _AuthService: AuthService,
    private _helperSerivce: HelperService,
    private _router: Router,
    private _route: ActivatedRoute) {}

  ngOnInit(): void {
    (document.querySelector('.auth-bg') as any).style.setProperty(
      '--imagePath',
      `${this.bgImagePath}`
    );
    let email = this._route.snapshot.queryParams?.['email']
    if (email) this.resetForm.patchValue({
      email: email
    })
  }

  sendResetForm(): void {
    const data = this.resetForm.value;

    if (this.resetForm.valid) {
      this._AuthService.onReset(data).subscribe({
        next: (res: IResetResponse) => {
          this._helperSerivce.openSnackBar(res.message);
        },
        error: (err: IErrorResponse) => {
          this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
        },
        complete: ()=>{
          this._router.navigate(["/auth/login"], { queryParams: { email: data["email"] } });
        }
      });
    }
  }
}
