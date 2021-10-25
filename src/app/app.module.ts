import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from "@angular/common/http";
import { EmployeeComponent } from './employee/employee.component';
import { CashEmployeeComponent } from './cash-employee/cash-employee.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { AuthGuard } from "./guard/auth.guard";
import { httpInterceptorProviders } from "./auth-interceptor";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AddComponent } from "./employee/add/add.component";
import { CashEmployeeAddComponent } from "./cash-employee/add/add.component";
import { AddRecordComponent } from './cash-employee/add-record/add-record.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewRecordComponent } from './cash-employee/view-record/view-record.component'
import { MatExpansionModule } from '@angular/material/expansion';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { DetailsComponent } from './company/details/details.component';
import { DepartmentListComponent } from './company/department-list/department-list.component';
import { DepartmentAddComponent } from './company/department-add/department-add.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DownloadDataComponent } from './company/download-data/download-data.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import {AddEmployeeRecordComponent, ExampleHeader} from './company/add-employee-record/add-employee-record.component';
import { ViewEmployeeRecordComponent } from './company/view-employee-record/view-employee-record.component';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ToolbarComponent,
    EmployeeComponent,
    CashEmployeeComponent,
    CompanyComponent,
    DepartmentComponent,
    TransactionComponent,
    UserComponent,
    AddComponent,
    CashEmployeeAddComponent,
    AddRecordComponent,
    ViewRecordComponent,
    AddCompanyComponent,
    DetailsComponent,
    DepartmentListComponent,
    DepartmentAddComponent,
    DownloadDataComponent,
    AddDepartmentComponent,
    EmployeeDetailsComponent,
    AddEmployeeRecordComponent,
    ViewEmployeeRecordComponent,
    ExampleHeader,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
