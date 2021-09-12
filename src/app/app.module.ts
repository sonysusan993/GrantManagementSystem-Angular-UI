import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RegisterComponent } from './register/register.component';
import { GrantprogramComponent } from './grantprogram/grantprogram.component';
import { ReviewComponent } from './review/review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ApplicantHomeComponent } from './applicant-home/applicant-home.component';
import { AddRowDirective}from './AddRowDirective'
import { ButtonModule } from 'primeng/button';
import { ServerErrorsInterceptorService } from './error/server-errors-interceptor.service';
import { ToastrModule } from "ngx-toastr";
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CanDeactivateGuard } from './can-deactivate-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    RegisterComponent,
    GrantprogramComponent,
    ReviewComponent,
    ApplicantHomeComponent,
    AddRowDirective,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    TableModule,
    DropdownModule,
    ButtonModule ,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
    }),
    MatDialogModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorsInterceptorService,
    multi:true
  },
  CanDeactivateGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
