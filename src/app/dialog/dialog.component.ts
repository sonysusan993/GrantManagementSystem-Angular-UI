import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EducationDetail } from 'src/Services/applicant-user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  action : string;
  applicantForm: FormGroup;
  educationdetails: EducationDetail[] = [];

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.action = "Are you sure you want to " +this.data.Action + " this data?";
    // document.getElementById("json").textContent = JSON.stringify(this.data, undefined, 2);

    this.applicantForm = this._formBuilder.group({
      Program: this.data.Program,
      Dateofbirth: this.data.Dateofbirth,
      Country: this.data.Country,
      State: this.data.State,
      Disable: this.data.Disable,
      Address: this.data.Address,
      City: this.data.City,
      PostalCode: this.data.PostalCode,
      Mobile: this.data.Mobile,
      Phone: this.data.Phone,
    });

    this.educationdetails = this.data.Education;
  }

}
