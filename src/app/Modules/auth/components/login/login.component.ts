import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HelperService, TokenService } from 'src/app/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)])
  })

  bgImagePath = "url('assets/images/bg3.png')";

  constructor(
    private _AuthService: AuthService, 
    private _TokenService: TokenService,
    private _helperSerivce: HelperService,
    private _Router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    (document.querySelector(".auth-bg") as any).style.setProperty("--imagePath", `${this.bgImagePath}`)
    let email = this._route.snapshot.queryParams?.['email']
    if (email) this.loginForm.patchValue({
      email: email
    })
  }

  sendLoginForm(): void {
    const data = this.loginForm.value;

    if (this.loginForm.valid) {
      this._AuthService.login(data).subscribe({
        next: (res) => {
          this._helperSerivce.openSnackBar("Login Success");
          this._TokenService.setToken(res);
        },
        error: (err) => {
          this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
        },
        complete: () => {
          this._Router.navigate(['/dashboard'])
        }
      })
    }

  }

}
