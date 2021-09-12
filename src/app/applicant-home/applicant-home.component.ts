import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { ApplicantUserService, EducationDetail } from 'src/Services/applicant-user.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-applicant-home',
  templateUrl: './applicant-home.component.html',
  styleUrls: ['./applicant-home.component.css']
})
export class ApplicantHomeComponent implements OnInit {

  grants: SelectItem[];
  countries: SelectItem[];
  states: SelectItem[];
  applicantForm: FormGroup;
  educationdetails: EducationDetail[] = [];
  submitted = false;
  errors =[];
  line :Number;

  constructor(private _formBuilder: FormBuilder,
    private _applicantUserService: ApplicantUserService,
    private toastrs: ToastrService,
    private matDialog: MatDialog) {

    this.applicantForm = this._formBuilder.group({
      grantid: ['',Validators.required],
      firstname: [localStorage.getItem('FirstName'),Validators.required],
      lastname: [localStorage.getItem('LastName'),Validators.required],
      email: [localStorage.getItem('Email'),Validators.required],
      dateofbirth: ['',Validators.required],
      countryid: ['',Validators.required],
      stateid: ['',Validators.required],
      disable: ['no',Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      postalcode: ['',Validators.required],
      mobile: ['',Validators.required],
      phone: ['',Validators.required]
    });
    this.grants = [{ label: 'Select', value: null }];
    this.countries = [{ label: 'Select', value: null }];
    this.states = [{ label: 'Select', value: null }];
   
    // grant dropdown
    this._applicantUserService.getGrantItemDetails().subscribe(
      (result: any) => {
        if (result.errorMessage) {
        }
        else {
          for (var i = 0; i < result.length; i++) {
            this.grants.push({ label: result[i].programName, value: result[i].grantId });
          }
        }
      });

    // country dropdown
    this._applicantUserService.getCountries().subscribe(
      (result: any) => {
        if (result.errorMessage) {
          return
        }
        else {
          for (var i = 0; i < result.length; i++) {
            this.countries.push({ label: result[i].countryName, value: result[i].countryId });
          }
        }
      });
  }

  get applicantFormControl() {
    return this.applicantForm.controls;
  }
  onChangeCountry(event: { value: number; }) {

    this.states = [{ label: 'Select', value: null }];
    // state dropdown
    this._applicantUserService.getStates(event.value).subscribe(
      (result: any) => {
        if (result.errorMessage) {
          return
        }
        else {
          for (var i = 0; i < result.length; i++) {
            this.states.push({ label: result[i].stateName, value: result[i].stateId });
          }
        }
      });
  }

  ngOnInit(): void {
  }

  onRowEditInit(educationdetail: EducationDetail) {
        console.log('Row edit initialized');
  }

  onRowEditSave(educationdetail: EducationDetail) {
    console.log('Row edit saved');
  }

  onRowEditCancel(educationdetail: EducationDetail, index: number) {
    this.educationdetails.splice(index, 1);
    console.log('Row edit cancelled');
  }

  onRowDelete(index: number) {
    this.educationdetails.splice(index, 1);
    console.log('Row deleted');
  }

  newRow() {
    return { coursename: '', country: '', institutionname: '', yearofcompletion: '' };
  }
  OnSubmit() {
    this.submitted = true;
    this.errors = [];
   if(this.applicantForm.valid)
   {
      for (var i = 0; i < this.educationdetails.length; i++) {
           
        this.line = i+1;
        if(!this.educationdetails[i].coursename)
        {
          this.errors.push("Please enter course name in line number - " +  this.line  +'\n');
        }
        if(!this.educationdetails[i].country)
        {
          this.errors.push("Please enter country in line number - " +  this.line  +'\n');
        }
        if(!this.educationdetails[i].institutionname)
        {
          this.errors.push("Please enter institution name in line number - " +  this.line+'\n');
        }
        if(!this.educationdetails[i].yearofcompletion)
        {
          this.errors.push("Please enter year of completion in line number - " +  this.line+'\n');
        }
       }

        if(this.errors.length != 0)
        {
          for(var i=0 ;i< this.errors.length;i++)
          {
           this.toastrs.error(this.errors[i]);
          }
          return;
       }
       const dialogConfig = new MatDialogConfig();
       
       dialogConfig.data = this.createDataForPopUP(this.applicantForm,this.educationdetails)
       dialogConfig.height = "700px";

      this.matDialog.open(DialogComponent, dialogConfig)
       .afterClosed().subscribe(data => {
         if(data) {

      this._applicantUserService.createApplicantDetails(this.applicantForm, this.educationdetails)
      .subscribe(
        (result: any) => {
          if (result.errorMessage) {
              this.toastrs.error(result.errorMessage);
          }
          else {
            this.toastrs.success("You are successfully saved your data");
            this.OnCancel();
          }
        },
        err => {
          this.toastrs.error("Please try again later");
        }
      );
         }
        });
   }
  }
  OnCancel() {
    this.submitted = false;
    this.applicantForm = this._formBuilder.group({
      grantid: ['',Validators.required],
      firstname: [localStorage.getItem('FirstName'),Validators.required],
      lastname: [localStorage.getItem('LastName'),Validators.required],
      email: [localStorage.getItem('Email'),Validators.required],
      dateofbirth: ['',Validators.required],
      countryid: ['',Validators.required],
      stateid: ['',Validators.required],
      disable: ['no',Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      postalcode: ['',Validators.required],
      mobile: ['',Validators.required],
      phone: ['',Validators.required]
    });

    this.educationdetails =  [];
  }
  logout()
  {
    localStorage.clear()
  }

  createDataForPopUP(applicantForm : FormGroup,educationdetails :EducationDetail[])
  {
    var education :  any = [];
    for(var i=0 ; i<educationdetails.length;i++)
    {
      var countrydetail = this.getcountry(educationdetails[i].country);

      var detail= 
      {
        coursename : educationdetails[i].coursename ,
        country :countrydetail,
        institutionname:educationdetails[i].institutionname,
        yearofcompletion :educationdetails[i].yearofcompletion,

      }
      education.push(detail);
    }
    var data =  {
      Program: document.getElementById("grantid").innerText,
      Dateofbirth: applicantForm.value.dateofbirth,
      Country: document.getElementById("countryid").innerText,
      State: document.getElementById("stateid").innerText,
      Disable: applicantForm.value.disable,
      Address: applicantForm.value.address,
      City: applicantForm.value.city,
      PostalCode: applicantForm.value.postalcode,
      Mobile: applicantForm.value.mobile,
      Phone: applicantForm.value.phone,
      Education :education ,
      Action : "save",
    }
   return data;
  }

  getcountry(id : number)
  {
    return this.countries.find(function(country) {
      return country.value === id
    })?.label;
  }
}
