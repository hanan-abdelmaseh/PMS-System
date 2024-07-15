import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { HelperService, IErrorResponse } from 'src/app/core';
import { IUser } from '../../model/iUser.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  onView: boolean = true;
  hideConfirm: boolean = true;

  BaseUrl = "https://upskilling-egypt.com:3003/";
  image!: File;
  imageSrc!: any;
  
  profileForm!: FormGroup;

  constructor(private _profileService: ProfileService,private _helperSerivce: HelperService) { }

  ngOnInit(): void {

      const DefaultValidators = [Validators.required];
      const PhoneNumberValidators = [...DefaultValidators, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]
      const EmailValidators = [...DefaultValidators, Validators.email];
      const PasswordValidators = [...DefaultValidators, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/)];

      this.profileForm = new FormGroup({
        userName: new FormControl('', DefaultValidators),
        email: new FormControl('', EmailValidators),
        country: new FormControl('', DefaultValidators),
        phoneNumber: new FormControl('', PhoneNumberValidators),
        confirmPassword: new FormControl('', PasswordValidators),
        profileImage: new FormControl(null)
      })

      this.getProfile();
  }

  onSelect(event: any) {
    if(this.onView) return;

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
        this.imageSrc = reader.result; 
    }
  }

  getProfile(){
    this._profileService.getProfile().subscribe({
      next: (res: IUser) => {
        this.profileForm.patchValue(res);

        this.imageSrc =  this.BaseUrl + res.imagePath;
      },
      error: (err: IErrorResponse) => {
        this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
      }
    })
  }


  onSubmit(): void {
    const data = new FormData();

    for (let key in this.profileForm.value) {
      if (key === "profileImage") continue;
      data.append(key, this.profileForm.value[key]);
    }

    if (this.image) data.append("profileImage", this.image);

    if (this.profileForm.valid) {
      this._profileService.updateProfile(data).subscribe({
        next: (res) => {
          //console.log(res)
          this._helperSerivce.openSnackBar("Updated Successfully");
        },
        error: (err: IErrorResponse) => {
          this._helperSerivce.openSnackBar(this._helperSerivce.getErrorMessage(err));
        }
      })
    }
  }


  toggleEdit(){
    this.onView = !this.onView;
  }

}
