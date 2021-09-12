import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface EducationDetail {
  coursename: string,
  country: number,
  institutionname: string,
  yearofcompletion: number
}
export interface ApplicantDetail {
  applicantId: number,
  applicantName: string,
  programCode: string,
  country: string,
  applicationStatus: string,
  reviewerStatus: string,
  isHighlight :boolean;
  color : string;
}

@Injectable({
  providedIn: 'root'
})

export class ApplicantUserService {

  // baseUrl = 'https://localhost:44320/api/';
  baseUrl = 'http://192.168.1.4/api/';

  educations: [{
    courseName: string,
    countryId: number,
    institutionName: string,
    yearOfCompletion: number
  }] ;
  header: HttpHeaders;
  userId :0;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem('Token')
    );
    
    this.educations =  [{ courseName: '', countryId: 0, institutionName: '',yearOfCompletion:0 }];
  }

  getGrantItemDetails() {

    return this.http.get<any>(this.baseUrl + 'admin/getactiveprogram', { headers: this.header });
  }

  getCountries() {
    return this.http.get<any>(this.baseUrl + 'applicant/getcountries', { headers: this.header });
  }

  getStates(countryId: number) {
    const params = new HttpParams().set('countryId', countryId);
    return this.http.get<any>(this.baseUrl + 'applicant/getstates', { params, headers: this.header });
  }

  getApplicantDetail() {
    return this.http.get<any>(this.baseUrl + 'admin/getreviewdetails', { headers: this.header });
  }

  createApplicantDetails(applicantform: FormGroup, educationDetail: EducationDetail[]) {
    for (var i = 0; i < educationDetail.length; i++) {
      this.educations.push({
        courseName: educationDetail[i].coursename,
        countryId: educationDetail[i].country,
        institutionName: educationDetail[i].institutionname,
        yearOfCompletion: educationDetail[i].yearofcompletion
      });
    }
    var body = {
      grantId: applicantform.value.grantid,
      userId: (Number)(localStorage.getItem("UserId")),
      dateofBirth: applicantform.value.dateofbirth,
      countryId: applicantform.value.countryid,
      stateId: applicantform.value.stateid,
      physicallyDisabled: (applicantform.value.disable == "yes" ? true : false),
      address: applicantform.value.address,
      city: applicantform.value.city,
      postalCode: applicantform.value.postalcode,
      mobile: applicantform.value.mobile,
      phone: applicantform.value.phone,
      educations: this.educations.splice(1,1),

    }
     console.log(body);
    return this.http.post(this.baseUrl + 'applicant/createapplicantdetails', body, { headers: this.header })
  }

  editStatus(applicantDetail: ApplicantDetail) {
    var body = {
      applicantId: applicantDetail.applicantId,
      reviewerStatus: applicantDetail.reviewerStatus,
    }
    return this.http.put(this.baseUrl + 'applicant/reviewapplicantdetails', body, { headers: this.header });
  }
}
