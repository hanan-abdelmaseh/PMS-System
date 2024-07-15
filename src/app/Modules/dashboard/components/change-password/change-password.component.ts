import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/core';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  isShownOLd: boolean = false;
  isShownNew: boolean = false;
  isConfirm: boolean = false

  changePasswordForm!: FormGroup;

  constructor(
    private _profileService: ProfileService,
    private _helperSerivce: HelperService,
    private _router: Router
  ) { }

  ngOnInit() {
    const PASSWORD_VALIDATORS = [Validators.required,
       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)];

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', PASSWORD_VALIDATORS),
      newPassword: new FormControl('', PASSWORD_VALIDATORS),
      confirmNewPassword: new FormControl('', PASSWORD_VALIDATORS)
    },
  {
    validators:this.passwordMatchValidator,
  });
  }
  passwordMatchValidator(control:AbstractControl){
return control.get('newPassword')?.value === control.get('confirmNewPassword')?.value ? null :
{mismatch:true};
  }
  


  changePassword(userData: FormGroup) {
    let data = userData.value;

    this._profileService.onChangePassword(data).subscribe({
      next: (res) => {
        this._helperSerivce.openSnackBar(res.message)
      },
      error: (err) => {
        this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
      }
      , complete: () => {
        this._router.navigateByUrl('/dashboard/home')
      }
    });
  }
}
