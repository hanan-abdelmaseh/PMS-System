import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Modules/dashboard/services/profile/profile.service';
import { TokenService } from 'src/app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  UserName: string = "";
  UserEmail: string = "";
  userData!: any;
  imgUrl: string = "";
  dummyImage: string = "assets/images/profile-user.png";
  BaseUrl = "https://upskilling-egypt.com:3003/";

  constructor(
    private _tokenService: TokenService,
    private _profileService: ProfileService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.UserName = this._tokenService.getName();
    this.UserEmail = this._tokenService.getEmail();
    this.getImageUrl()
  }

  getImageUrl() {
    this._profileService.getProfile().subscribe({
      next: (res: any) => {
        this.userData = res;
        this.imgUrl = this.BaseUrl + res.imagePath;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openProfile(){
    this._router.navigate(["/dashboard/profile"]);
  }


  logout() {
    this._tokenService.logout()
  }


}
