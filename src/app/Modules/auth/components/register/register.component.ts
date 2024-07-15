import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { IErrorResponse } from 'src/app/core';
import { IResetResponse } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  hide: boolean = true;
  hideConfirm: boolean = true;

  image!: File;
  url!: any;
  
  registerForm!: FormGroup;

  bgImagePath = "url('assets/images/bg1.png')";

  constructor(private _AuthService: AuthService,private _helperSerivce: HelperService, private _router:Router) { }

  ngOnInit(): void {
      (document.querySelector(".auth-bg") as any).style.setProperty("--imagePath", `${this.bgImagePath}`);
      this.controlStyle();

      const DefaultValidators = [Validators.required];
      const PhoneNumberValidators = [...DefaultValidators, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]
      const EmailValidators = [...DefaultValidators, Validators.email];
      const PasswordValidators = [...DefaultValidators, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)];

      this.registerForm = new FormGroup({
        userName: new FormControl('', DefaultValidators),
        email: new FormControl('', EmailValidators),
        country: new FormControl('', DefaultValidators),
        phoneNumber: new FormControl('', PhoneNumberValidators),
        password: new FormControl('', PasswordValidators),
        confirmPassword: new FormControl('', PasswordValidators),
        profileImage: new FormControl(null)
      }, {
        validators:this.passwordMatchValidator,
      })
  }
  
  passwordMatchValidator(control:AbstractControl){
    return control.get('newPassword')?.value === control.get('confirmNewPassword')?.value ? null :
    {mismatch:true};
      }

  onSelect(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.image = files[0];
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }
  }


  sendRegisterForm(): void {
    const data = new FormData();

    for (let key in this.registerForm.value) {
      if (key === "profileImage") continue;
      data.append(key, this.registerForm.value[key]);
    }

    if (this.image) data.append("profileImage", this.image);

    if (this.registerForm.valid) {
      this._AuthService.register(data).subscribe({
        next: (res: any) => {
          this._helperSerivce.openSnackBar(res.message);
        },
        error: (err: IErrorResponse) => {
          this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
        }, complete:()=>{
          this._router.navigate(["/auth/verify"], {queryParams: {email: data.get("email")}});
        }
      })
    }
  }

  controlStyle(){
    (document.querySelector(".width-control") as any).classList.remove("col-md-8");
    (document.querySelector(".width-control") as any).classList.add("col-md-10");
    (document.querySelector(".padding-control") as any).classList.remove("p-5");
    (document.querySelector(".padding-control") as any).classList.add("p-4", "px-5");
  }

}
