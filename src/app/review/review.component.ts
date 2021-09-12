import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { ApplicantUserService, ApplicantDetail } from 'src/Services/applicant-user.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  applicantDetails: ApplicantDetail[] = [];
  status: SelectItem[];
  errorMessage: '';
  isStatic: false;


  constructor(private _applicantUserService: ApplicantUserService,
    private toastrs : ToastrService,
   ) {
    this.status = [{ label: 'Select Status', value: null },
    { label: 'Approved', value: 'Approved' }, 
    { label: 'Rejected', value: 'Rejected' }];
  }
  canDeactivate(): Observable<boolean> | boolean {
          return  window.confirm('There are unsaved changes! Are you sure?');
      return true;
    }	

  ngOnInit(): void {
    this.onLoadApplicantDetails();
  }
  onRowEditInit(applicantDetail: ApplicantDetail) {
    applicantDetail.isHighlight =true;
    applicantDetail.color ="pink";
    console.log('Row edit initialized');
  }

  onRowEditSave(applicantDetail: ApplicantDetail) {

    this._applicantUserService.editStatus(applicantDetail).subscribe(
      (result: any) => {
        if (result.errorMessage) {
          this.toastrs.error(result.errorMessage);
        }
        else {
          this.onLoadApplicantDetails();
          this.toastrs.success("Entry edited successfully");
        }

      });
    console.log('Row edit saved');
  }

  onRowEditCancel(applicantDetail: ApplicantDetail, index: number) {
    applicantDetail.isHighlight =false;
    console.log('Row edit cancelled');
  }

  onLoadApplicantDetails() {
    this._applicantUserService.getApplicantDetail().subscribe(
      (result: any) => {
        if (result.errorMessage) {
          this.toastrs.error(result.errorMessage);
        }
        else {
          this.applicantDetails = result;
        }
      });
  }
}
