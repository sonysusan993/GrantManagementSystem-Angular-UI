import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminuserService, Program } from 'src/Services/adminuser.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MustGreater } from 'src/Services/MustGreater';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-grantprogram',
  templateUrl: './grantprogram.component.html',
  styleUrls: ['./grantprogram.component.css'],
})
export class GrantprogramComponent implements OnInit {

  isHiddendiv = true;
  programform: FormGroup;
  errorMessage = '';
  programs: Program[] = [];
  status: SelectItem[];
  submitted = false;
  errors =[];
  selectedRow: number; 
  unSaved: boolean = true; 

  constructor(private _formBuilder: FormBuilder,
    private _adminuserService: AdminuserService,
    private _router: Router,
    private toastrs: ToastrService,
  ) {

    this.programform = this._formBuilder.group({
      programName: ['',  Validators.required],
      programCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required]
    },
    {validator: MustGreater('startDate', 'endDate')}
    );
    this.status = [{ label: 'Select Status', value: null },
                  { label: 'Active', value: 'Active' }, 
                  { label: 'InActive', value: 'InActive' }
                  ];
  }

//   canDeactivate(): Observable<boolean> | boolean {
//     if (this.unSaved) {
// debugger;
//        window.confirm('There are unsaved changes! Are you sure?');
//                       }
//     return true;
// }   
canDeactivate(): Observable<boolean> | boolean {
debugger;
  if ( this.programform.dirty) {

      return  window.confirm('There are unsaved changes! Are you sure?');
  }
  return true;
}	

  ngOnInit(): void {
    console.log("after click grant program" +localStorage.getItem('Token'));
    this.loadgridwithoutcolor();
  }
  get programformControl() {
    return this.programform.controls;
  }
  createclick() {
    this.isHiddendiv = false;
  }
  save() {
    this.submitted = true;
    if (this.programform.valid) {
      this._adminuserService.createprogram(this.programform).subscribe(
        (result: any) => {
          if (result.errorMessage) {

            this.errorMessage = result.errorMessage;
          }
          else {
            this.programform = this._formBuilder.group({
              programName: ['',  Validators.required],
              programCode: ['', Validators.required],
              startDate: ['', Validators.required],
              endDate: ['', Validators.required],
              status: ['', Validators.required]
            })
            this.isHiddendiv = true;
            this.errorMessage = '';
            this.loadgrid();
            this.cancel();
            this.toastrs.success("You have successfully saved your data");   
          }
        },
        err => {
          this.toastrs.error("Please try again later");
        }
      );
    }
  }
  cancel() {
    this.submitted = false;
    this.isHiddendiv = true;
    this.programform = this._formBuilder.group({
      programName: ['',  Validators.required],
      programCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  loadgrid() {
    this._adminuserService.loadprograms().subscribe(
      (result: any) => {
        if (result.errorMessage) {

          this.errorMessage = result.errorMessage;
        }
        else {
          this.programs = result;
          if(this.programs !=null)
          {
             this.programs[0].isHighlight =true;
             this.programs[0].color = "lightskyblue";
          }
        }
      },
      err => {
        this.toastrs.error("Please try again later");
      });
  }
  loadgridwithoutcolor() {
    this._adminuserService.loadprograms().subscribe(
      (result: any) => {
        if (result.errorMessage) {

          this.errorMessage = result.errorMessage;
        }
        else {
          this.programs = result;
        }
      },
      err => {
        this.toastrs.error("Please try again later");
      });
  }

  onRowEditInit(program: Program) {
    program.isHighlight = true;
    program.color = "Pink";
  }

  onRowEditSave(program: Program) {

   if(!program.programName)
   {
    this.errors.push("Please enter program name");
   }
   if(!program.programCode)
   {
    this.errors.push("Please enter program code");
   }
   if(!program.startDate)
   {
    this.errors.push("Please enter start date");
   }
   if(!program.endDate)
   {
    this.errors.push("Please enter end date");
   }
   if(program.endDate< program.startDate)
   {
    this.errors.push("End date should be greater than start date");
   }
   
   if(this.errors.length != 0)
   {
     for(var i=0 ;i< this.errors.length;i++)
     {
      this.toastrs.error(this.errors[i]);
     }

     this.loadgridwithoutcolor();
     return;
    }
    this._adminuserService.editprogram(program).subscribe(
      (result: any) => {
        if (result.errorMessage) {

          this.errorMessage = result.errorMessage;
        }
        else {
          this.loadgridwithoutcolor();
          this.toastrs.success('Row edit saved');
        }
      },
      err => {
        this.toastrs.error("Please try again later");
      });
  }

  onRowEditCancel(program: Program, index: number) {
    program.isHighlight = false;
    this.toastrs.success('Row edit cancelled');
  }

  onRowDelete(program: Program) {
    program.isHighlight =true;
    program.color = "red";

    this._adminuserService.deleteprogram(program.grantId).subscribe(
      (result: any) => {
        if (result.errorMessage) {

          this.toastrs.error(result.errorMessage);

        }
        else {
          this.loadgridwithoutcolor();
         this.toastrs.success('Row deleted');

        }

      });
  }
  isEmpty(input) {
    return input.replace(/\s/g, '') === "";
  }
 
}
