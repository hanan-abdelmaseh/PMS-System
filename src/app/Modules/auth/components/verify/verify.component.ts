import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService, IErrorResponse } from 'src/app/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerifyComponent implements OnInit {

  bgImagePath = "url('assets/images/bg3.png')";
  hide: boolean = true;
  verifyForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required])
  })

  constructor(private _AuthService: AuthService, private _helperService: HelperService, private _router: Router, private _route: ActivatedRoute) { }


  ngOnInit(): void {
    (document.querySelector(".auth-bg") as any).style.setProperty("--imagePath", `${this.bgImagePath}`)
    let email = this._route.snapshot.queryParams?.['email']
    if (email) this.verifyForm.patchValue({
      email: email
    })
  }

  sendVerifyForm(): void {
    const data = this.verifyForm.value;

    if (this.verifyForm.valid) {
      this._AuthService.verify(data).subscribe({
        next: (res: any) => {
          this._helperService.openSnackBar(res.message);
        },
        error: (err: IErrorResponse) => {
          this._helperService.openSnackBar(this._helperService.getErrorMessage(err));
        }, 
        complete: () => {
          this._router.navigate(["/auth/login"], { queryParams: { email: data["email"] } });
        }
      })
    }

  }
}


