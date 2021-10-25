import { Component, OnInit } from '@angular/core';
import {Employee} from "../model/employee";
import {ApiService} from "../service/api.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CashEmployeeAddComponent} from "./add/add.component";
import {AddRecordComponent} from "./add-record/add-record.component";
import {ViewRecordComponent} from "./view-record/view-record.component";




@Component({
  selector: 'app-cash-employee',
  templateUrl: './cash-employee.component.html',
  styleUrls: ['./cash-employee.component.scss']
})
export class CashEmployeeComponent implements OnInit {

  employees: Employee[] = [];
  matDialogRef: MatDialogRef<CashEmployeeAddComponent> | undefined;
  recordDialogRef: MatDialogRef<AddRecordComponent> | undefined
  cashEmployeeRecordRef: MatDialogRef<ViewRecordComponent> | undefined;
  id!: number;
  Search: any;

  constructor(private apiservice: ApiService,private  matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  OpenModal():void {
    this.matDialogRef =  this.matDialog.open(CashEmployeeAddComponent)
    this.matDialogRef?.afterClosed().subscribe(()=>{
      this.getEmployeeList();
    })
  }

  AddRecord(employeeId: number): void {
    this.id = employeeId
    this.recordDialogRef = this.matDialog.open(AddRecordComponent, {
      data: { employee_id:  this.id }
    })
  }

  ListRecord(employeeId: number): void {
    this.id = employeeId;
    this.cashEmployeeRecordRef = this.matDialog.open(ViewRecordComponent, {
      data:{employee_id: this.id}
    })
  }

  private getEmployeeList() {
    this.apiservice.employeeNonregular('non-regular').subscribe(data=>{
      this.employees=data;
      console.log(data)})
  }
}
