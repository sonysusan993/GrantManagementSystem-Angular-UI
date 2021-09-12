import { Component, OnInit } from '@angular/core';
import { ApplicationusersService } from 'src/Services/applicationusers.service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _applicationUserService: ApplicationusersService,
    private _router: Router,
    private toastrs: ToastrService) { }

  email = '';
  password = '';

  ngOnInit() {
    localStorage.clear();
  }

  OnLogin() {
    localStorage.clear();
    this._applicationUserService.login(this.email, this.password).subscribe(
      (result: any) => {
        if (result.errorMessage) {
          this.toastrs.warning( result.errorMessage);
        }
        else {
          localStorage.setItem('UserId', result.userId);
          localStorage.setItem('FirstName', result.firstName);
          localStorage.setItem('LastName', result.lastName);
          localStorage.setItem('Email', result.email);
          localStorage.setItem('Role', result.userType);
          localStorage.setItem('Token', result.token);

          if (result.userType == "Admin") {
            this._router.navigate(['adminhome']);
          }
          else {
            this._router.navigate(['applicanthome']);
          }
        }
      },
      err => {
        this.toastrs.error("Please try again later");
      }
    );

  }
}
