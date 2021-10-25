import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api.service";
import {Employee} from "../model/employee";
import { MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddComponent} from "./add/add.component";
import {MatTableDataSource} from "@angular/material/table";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";


export interface Update {
  employee_id:''
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  isLoadingResults = true;
  matDialogRef: MatDialogRef<AddComponent> | undefined;
  detailsDialogRef: MatDialogRef<EmployeeDetailsComponent> | undefined;

  constructor(private  apiservice: ApiService, private  matDialog: MatDialog) {

  }

  employeeId: number | undefined;
  displayedColumns: string[] = ['id','employee_name','phone_number','per_hour_rate','company_name','department_name','view','update'];
  ngOnInit(): void {
    this.getEmployeeList()
  }

  OpenModal(employe_id:number):void {
    this.employeeId = employe_id
    this.matDialogRef =  this.matDialog.open(AddComponent, {
      data: {
        employee_id: this.employeeId
      }

    });
    this.matDialogRef?.afterClosed().subscribe(()=>{
      this.getEmployeeList();
    })
  }

  getEmployeeList(): void {
    this.apiservice.employeeRegular('regular').subscribe((data) => {this.employees= data,
    console.log(data)});
    this.isLoadingResults = false;

  }

  OpenEmployeeDetails(employeID: number): void {
    this.employeeId = employeID;
    this.detailsDialogRef = this.matDialog.open(EmployeeDetailsComponent, {
      data: {employee_id : this.employeeId}
    });
  }
}
