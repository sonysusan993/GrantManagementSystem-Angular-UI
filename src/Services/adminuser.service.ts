import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Program {
  grantId: number;
  programName: string;
  programCode: string;
  startDate: Date;
  endDate: Date;
  status: string;
  isHighlight :boolean;
  color : string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminuserService {
  // baseUrl = 'https://localhost:44320/api/';
  baseUrl = 'http://192.168.1.4/api/';
  header: HttpHeaders

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem('Token')
    );
  }

  loadprograms() {
    return this.http.get<any>(this.baseUrl + 'admin/getallprogram', { headers: this.header });
  }

  createprogram(programform: FormGroup) {
    var body = {
      programName: programform.value.programName,
      programCode: programform.value.programCode,
      startDate: programform.value.startDate,
      endDate: programform.value.endDate,
      status: (programform.value.status == "Active" ? true : false),
    }
    return this.http.post(this.baseUrl + 'admin/createprogram', body, { headers: this.header });
  }

  editprogram(program: Program) {
    var body = {
      grantId: program.grantId,
      programName: program.programName,
      programCode: program.programCode,
      startDate: program.startDate,
      endDate: program.endDate,
      status: (program.status == "Active" ? true : false),
    }
    return this.http.put(this.baseUrl + 'admin/editprogram', body, { headers: this.header });
  }

  deleteprogram(id: number) {
    const params = new HttpParams().set('id', id);
    return this.http.delete(this.baseUrl + 'admin/deleteprogram', { params, headers: this.header });
  }
}
