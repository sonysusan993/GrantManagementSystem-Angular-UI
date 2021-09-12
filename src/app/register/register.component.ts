import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApplicationusersService } from 'src/Services/applicationusers.service';
import { MustMatch } from 'src/Services/MustMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  registerform: FormGroup;

  constructor(private _applicationUserService: ApplicationusersService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private toastrs: ToastrService,
    ) {


    this.registerform = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmpassword')
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    debugger;
      if ( this.registerform.dirty) {
    
          return  window.confirm('There are unsaved changes! Are you sure?');
      }
      return true;
    }	
    
  get registerFormControl() {
    return this.registerform.controls;
  }

  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerform.valid) {
        
              this._applicationUserService.register(this.registerform).subscribe(
               (result: any) => {
              if (result.errorMessage) {
                this.toastrs.error(result.errorMessage);
               }
               else {
                  this.toastrs.success('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerform.value, null, 4));
                  this.toastrs.success("You are successfully registered in GMS.Please login")
                  this._router.navigate(['login']);
               }
             },
        err => {
          this.toastrs.error("Please try again later");
        }
      );
  }
  }
}
